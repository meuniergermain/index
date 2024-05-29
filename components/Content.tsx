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
					<button className={`button button-side transitions ${Panel ? 'button-active' : 'button-inactive'} ${About ? 'button-selected-panel' : ''}`} onClick={() => handleClick(setAbout, About)} type="button">À propos</button>
					<button className={`button button-main transitions ${Panel ? 'button-active' : 'button-inactive'} ${Contact ? 'button-selected-panel' : ''}`} onClick={() => handleClick(setContact, Contact)} type="button">Contact</button>
					<button className={`button button-side transitions ${Panel ? 'button-active' : 'button-inactive'} ${Projects ? 'button-selected-panel' : ''}`} onClick={() => handleClick(setProjects, Projects)} type="button">Projets</button>
				</div>

				<div id="panel-content-holder" className={`${Panel ? 'panel-content-active' : 'panel-content-inactive'}`}>
					<div className={`panel-content transitions ${About ? 'pointer-events-auto panel-content-active' : 'pointer-events-none panel-content-inactive'}`}>
						<div className="content-text text-white text-justify md:text-xl">
							<h2 className={`text-yellow-400 mb-5 text-2xl md:text-4xl`}>À propos</h2>
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
								<li><Link className='hover:text-purple-400' href={"www.linkedin.com/in/germain-meunier-033760310"}>LinkedIn</Link></li>
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