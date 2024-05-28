// components/DotCanvas.js
"use client";

import { useEffect, useRef, useState } from 'react';

const DotCanvas = () => {
	const [isPerformanceOkay, setIsPerformanceOkay] = useState(true);
	const [isPerformanceAdjusted, setIsPerformanceAdjusted] = useState(false);
	const [gridSize, setGridSize] = useState(30);
	const canvasRef = useRef(null);
	const animationRef = useRef(null);
	const mousePos = useRef({ x: null, y: null });
	const lastMousePos = useRef({ x: null, y: null });
	const lastMouseMoveTime = useRef(Date.now());
	const dotsRef = useRef([]);
	const velocitiesRef = useRef([]);
	const repelDistanceRef = useRef(0);
	let maxRepelDistance = 140;
	let repelSpeed = 2;
	const decreaseSpeed = 5;
	const waveFrequency = 0.01;
	const waveAmplitude = 50;
	const dotsColor = "255, 255, 255";

	useEffect(() => {
		if (!canvasRef.current) return;
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const springConstant = 0.04;
		const damping = 0.90;

		if (window.innerWidth <= 640) { // Adjust maxRepelDistance for mobile
			maxRepelDistance = 70;
			repelSpeed = 20000;
		}

		const initializeCanvas = () => {
			const canvasWidth = (canvas.width = window.innerWidth + 20);
			const canvasHeight = (canvas.height = window.innerHeight + 20);

			const dots = [];
			const velocities = [];

			for (let x = gridSize; x < canvasWidth; x += gridSize) {
				for (let y = gridSize; y < canvasHeight; y += gridSize) {
					dots.push({ x, y, originalX: x, originalY: y });
					velocities.push({ vx: 0, vy: 0 });
				}
			}

			dotsRef.current = dots;
			velocitiesRef.current = velocities;
		};

		const drawDots = () => {
			const canvasWidth = canvas.width;
			const canvasHeight = canvas.height;
			const dots = dotsRef.current;
			const dotRadius = 3;

			ctx.clearRect(0, 0, canvasWidth, canvasHeight);
			for (const dot of dots) {
				ctx.beginPath();
				ctx.rect(dot.x, dot.y, dotRadius, dotRadius);
				ctx.fillStyle = `rgba(${dotsColor}, ${dot.opacity ?? 0.2})`;
				ctx.fill();
				ctx.closePath();
			}
		};

		const updateDots = () => {
			const dots = dotsRef.current;
			const velocities = velocitiesRef.current;
			const maxOpacity = 1;
			const minOpacity = 0.2;

			for (let i = 0; i < dots.length; i++) {
				const dot = dots[i];
				const velocity = velocities[i];
				const dx = dot.originalX - (mousePos.current.x ?? dot.originalX);
				const dy = dot.originalY - (mousePos.current.y ?? dot.originalY);
				const distance = Math.sqrt(dx * dx + dy * dy);
				const repelDistance = repelDistanceRef.current;

				const speed = Math.sqrt(velocity.vx * velocity.vx + velocity.vy * velocity.vy);
				const normalizedSpeed = speed / 2;
				const opacity = minOpacity + (maxOpacity - minOpacity) * normalizedSpeed;

				dot.opacity = opacity;
				if (
					mousePos.current.x !== null &&
					mousePos.current.y !== null &&
					distance < repelDistance
				) {
					const repulsionForce = (repelDistance - distance) / repelDistance;

					const angle = Math.atan2(dy, dx);

					// Calculate wave offset based on time
					const waveOffsetX = Math.sin(Date.now() * waveFrequency) * waveAmplitude;
					const waveOffsetY = Math.cos(Date.now() * waveFrequency) * waveAmplitude;

					const targetX = dot.originalX + Math.cos(angle) * (repelDistance + waveOffsetX) * repulsionForce;
					const targetY = dot.originalY + Math.sin(angle) * (repelDistance + waveOffsetY) * repulsionForce;

					const springForceX = springConstant * (targetX - dot.x);
					const springForceY = springConstant * (targetY - dot.y);
					velocity.vx += springForceX;
					velocity.vy += springForceY;
				}

				const springForceX = springConstant * (dot.originalX - dot.x);
				const springForceY = springConstant * (dot.originalY - dot.y);
				velocity.vx += springForceX;
				velocity.vy += springForceY;

				velocity.vx *= damping;
				velocity.vy *= damping;

				dot.x += velocity.vx;
				dot.y += velocity.vy;
			}

			lastMousePos.current.x = mousePos.current.x;
			lastMousePos.current.y = mousePos.current.y;
		};

		const handleMouseMove = (event) => {
			mousePos.current = { x: event.clientX, y: event.clientY };
			lastMouseMoveTime.current = Date.now();
			repelDistanceRef.current = Math.min(
				repelDistanceRef.current + repelSpeed,
				maxRepelDistance
			);
		};

		const handleTouchMove = (event) => {
			const touch = event.touches[0];
			mousePos.current = { x: touch.clientX, y: touch.clientY };
			lastMouseMoveTime.current = Date.now();
			repelDistanceRef.current = Math.min(
				repelDistanceRef.current + repelSpeed,
				maxRepelDistance
			);
		};

		const animate = () => {
			const currentTime = Date.now();
			if (currentTime - lastMouseMoveTime.current > 100) {
				repelDistanceRef.current = Math.max(
					repelDistanceRef.current - decreaseSpeed,
					0
				);
			}

			updateDots();
			drawDots();
			animationRef.current = requestAnimationFrame(animate);
		};

		const handleResize = () => {
			initializeCanvas();
		};

// Measure performance for the first few frames
const measurePerformance = () => {
    const start = performance.now();
    let frameCount = 0;
    const checkPerformance = () => {
        frameCount++;
        if (frameCount < 10) {
            requestAnimationFrame(checkPerformance);
        } else {
            const end = performance.now();
            const duration = end - start;
            const averageFrameTime = duration / frameCount;
            const isPerformanceOkay = averageFrameTime < 16.67; // Approximately 60 FPS
            if (!isPerformanceOkay && gridSize < 160 && !isPerformanceAdjusted) {
                setGridSize(gridSize + 10); // Adjust gridSize if performance is not sufficient
                setIsPerformanceAdjusted(true); // Mark performance as adjusted
            } else {
                setIsPerformanceOkay(isPerformanceOkay);
            }
        }
    };
    requestAnimationFrame(checkPerformance);
};

		measurePerformance();

		if (isPerformanceOkay) {
			window.addEventListener('resize', handleResize);
			canvas.addEventListener('mousemove', handleMouseMove);
			canvas.addEventListener('touchmove', handleTouchMove);

			initializeCanvas();
			animate();
		} else {
			setGridSize(30);
			initializeCanvas();
			drawDots();
		}

		return () => {
			cancelAnimationFrame(animationRef.current);
			window.removeEventListener('resize', handleResize);
			canvas.removeEventListener('mousemove', handleMouseMove);
			canvas.removeEventListener('touchmove', handleTouchMove);
		};
	}, [isPerformanceOkay, gridSize]);

	return <canvas ref={canvasRef} className="DotCanvas gradient-background" />;
};

export default DotCanvas;
