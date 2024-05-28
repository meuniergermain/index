// components/Content.js
"use client";
import React, { useState } from 'react';
import Link from "next/link";

export default function Content() {
	const [Panel, setPanel] = useState(false);
	const [About, setAbout] = useState(false);
	const [Contact, setContact] = useState(false);
	const [Projects, setProjects] = useState(false);

	const listFunctions = [setAbout, setContact, setProjects]

	const handleClick = (setTrue: Function, value: boolean) => {
		if (!value) {
			setPanel(true);
			listFunctions.forEach(element => {
				element(false);
			});
			setTrue(true);
		} else {
			setPanel(false);
			listFunctions.forEach(element => {
				element(false);
			});
		}
	};

	return (
		<>

			<div id="main-body" className="transitions">
				<div id="titles">
					<h1 className={`titles-h1 transitions ${Panel ? 'titles-h1-active' : 'titles-h1-inactive'}`}>Germain Meunier</h1>
					<h2 className={`titles-h2 transitions ${Panel ? 'titles-h2-active' : 'titles-h2-inactive'}`}>Web dev hobbyist</h2>
				</div>


				<div id="body-body">
					<div id="panel" className={`${Panel ? 'panel-active' : 'panel-inactive'}`}>
					</div>
				</div>
				<div id="buttons-bar" className="transitions">
					<button className={`button button-side transitions ${Panel ? 'button-active' : 'button-inactive'} ${About ? 'button-selected-panel' : ''}`} onClick={() => handleClick(setAbout, About)} type="button">About</button>
					<button className={`button button-main transitions ${Panel ? 'button-active' : 'button-inactive'} ${Contact ? 'button-selected-panel' : ''}`} onClick={() => handleClick(setContact, Contact)} type="button">Contact</button>
					<button className={`button button-side transitions ${Panel ? 'button-active' : 'button-inactive'} ${Projects ? 'button-selected-panel' : ''}`} onClick={() => handleClick(setProjects, Projects)} type="button">Projets</button>
				</div>

				<div id="panel-content-holder" className={`${Panel ? 'panel-content-active' : 'panel-content-inactive'}`}>
					<div className={`panel-content transitions ${About ? 'pointer-events-auto panel-content-active' : 'pointer-events-none panel-content-inactive'}`}>
						<div className="content-text text-white text-justify md:text-xl">
							<h2 className={`text-yellow-400 mb-5 text-2xl md:text-4xl`}>About</h2>
							<p className='leading-loose'>Je m'appelle Germain Meunier. Passionné par les technologies numériques depuis de nombreuses années, j'ai récemment entrepris une reconversion professionnelle pour devenir développeur web.<br />
								Je suis à la recherche d'une alternance qui me permettrait de suivre une vocation qui me tient à coeur où j'assurerai le sérieux et la ténacité.<br />
								Ce site a été créé avec Next.js et la physique derrière la grille de points avec ChatGPT-4o.
							</p>
						</div>
					</div>
					<div className={`panel-content transitions ${Contact ? 'pointer-events-auto panel-content-active' : 'pointer-events-none panel-content-inactive'}`}>
						<div className="content-text text-white text-justify md:text-xl">
							<h2 className={`text-yellow-400 mb-5 text-2xl md:text-4xl`}>Contact</h2>
							<ul className='list-disc leading-loose list-inside'>
								<li><Link className='hover:text-purple-400' href={"mailto:meunier.germain@gmail.com"}>Mon adresse mail</Link></li>
								<li><Link className='hover:text-purple-400' href={"https://github.com/meuniergermain"}>Mon Github</Link></li>
								<li>LinkedIn (prochainement)</li>
							</ul>
						</div>
					</div>
					<div className={`panel-content transitions ${Projects ? 'pointer-events-auto panel-content-active' : 'pointer-events-none panel-content-inactive'}`}>
						<div className="content-text text-white text-justify md:text-xl">
							<h2 className={`text-yellow-400 mb-5 text-2xl md:text-4xl`}>Mes projets</h2>
							<ul className='list-disc leading-loose list-inside'>
								<li><Link className='hover:text-purple-400' href={"https://github.com/meuniergermain/discord-bot"}>Bot discord</Link><p className='md:text-lg ml-6'>M'envoit des notifications sur Discord lorsqu'un stream suivi est en ligne, peut aussi répondre via une API de GPT</p></li>
								<li><Link className='hover:text-purple-400' href={"./canvas"}>Quadrillage interactif de points</Link><p className='md:text-lg ml-6'>Physique construite avec l'aide de ChatGPT-4o</p></li>
							</ul>
						</div>
					</div>
				</div>
			</div>



		</>
	);
}

//<div className="pointer-events-none absolute flex items-center h-screen">
//pointer-events-auto bg-blue-500 w-64 h-32 hover:h-64 transition-height

/* BACKUP */
/*
			<div className="pointer-events-none fixed top-0 left-0 flex items-center justify-center w-full h-full">
				<div className="relative w-3/5 h-2/3 flex flex-col items-center justify-center">
					<div className={`bg-blue-500 flex flex-col text-white font-bold text-center transition-all duration-500 ${Panel ? 'scale-50' : 'scale-100'}`}>
						<h1 className={`transition-all duration-500 leading-none text-8xl ${Panel ? 'scale-50 opacity-40' : 'opacity-100 delay-700'}`}>Germain Meunier</h1>
						<h1 className={`transition-all duration-500 leading-none text-2xl ${Panel ? ' scale-0 opacity-0' : 'opacity-100 delay-1000'}`}>Web dev hobbyist</h1>
					</div>

					<div className="bg-red-500 flex relative flex-col-reverse justify-between w-full h-full grow">
						<div className={`bg-white rounded-lg flex w-full transition-all duration-500 mb-24 ${Panel ? 'grow delay-200' : 'grow-0 delay-500'}`}>
						</div>



						<div className={`flex w-full h-24 absolute bottom-0 left-0 justify-center transition-all duration-1000 items-end`}>
							<button className={`group pointer-events-auto bg-white hover:bg-gray-500 rounded-lg text-gray-500 font-bold basis-1/4 mx-2 transition-all duration-500 ${Panel ? 'h-20 ' : 'h-10 delay-1000'}`} onClick={() => handleClick(setAbout, About)} type="button">
								<span className={`transition-all duration-500 group-hover:opacity-100 ${Panel ? 'opacity-100' : 'opacity-50'}`}>About</span>
							</button>
							<button className={`group pointer-events-auto bg-white rounded-lg text-gray-500 font-bold basis-1/2 mx-2 transition-all duration-500 ${Panel ? 'h-20 ' : 'h-16 delay-1000'}`} onClick={() => handleClick(setContact, Contact)} type="button">
								<span className={`transition-all duration-500 group-hover:opacity-100 ${Panel ? 'opacity-100' : 'opacity-50'}`}>Contact</span>
							</button>
							<button className={`group pointer-events-auto bg-white rounded-lg text-gray-500 font-bold basis-1/4 mx-2 transition-all duration-500 skew-y-12 ${Panel ? 'h-20 ' : 'h-10 delay-1000'}`} onClick={() => handleClick(setProjects, Projects)} type="button">
								<span className={`transition-all duration-500 group-hover:opacity-100 ${Panel ? 'opacity-100' : 'opacity-50'}`}>Projects</span>
							</button>
						</div>
					</div>
					<div className={`pointer-events-none flex absolute w-full h-full px-16 pt-28 pb-32 transition-all duration-500 overflow-auto ${About ? 'opacity-100 delay-500' : 'opacity-0'}`}>
						<div className={`bg-gray-100 flex flex-col text overflow-auto ${About ? 'pointer-events-auto' : 'pointer-events-none'}`}>
							<h2 className={`text-yellow-400 text-4xl overflow-auto`}>Salut</h2>
							<p className={`text-xl overflow-auto`}>
								C'est moi le ipsum machin bidule
							</p>
						</div>
					</div>

				</div>

			</div>
*/