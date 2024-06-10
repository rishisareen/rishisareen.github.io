---
layout: page
title: About Me
sidebar_link: true
---

<style>
	.wrapper {
		margin: auto;
		max-width: 75rem;
	}

	aside, footer, header, main, section {
		display: block;
		margin: 0;
		color: #000;
	}

	main {
		/* background: #000 */
	}
	.header {
		/* background: #03a9f4 */
	}
	.hero {
		/* background: #d22b1f */
	}

	img { 
		margin: auto;
		width: 100%;
		max-width: 400px;
		max-height: 100%;
		object-fit: contain;
	}
	   
	.content {
		flex: 1;
		max-width: 800px;
		/* background: #129a22 */
		margin-left: 20px;
	}
	.sidebar {
		flex: 0 1 400px;
	}

	.footer,
	.sidebar {
		border: 1px solid #fff;
	}
	   
	.some-page-wrapper {
		margin: 15px;
		background-color: white;
	}

	.footer-row {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
	}

	.footer-column {
		display: flex;
		flex-direction: column;
		flex-basis: 100%;
		border: 1px solid #000;
	}
	.footer-column:hover {
		background-color: #2699ab; 
		cursor: hand;
		cursor: pointer;
	}

	.footer-column img {
		height: 100px;
		width: auto;
	}
	
	@media screen and (min-width: 640px) {
		.flex-container {
			display: flex;
		}
		.footer-column {
			flex: 1;
		}
	}
</style>

<main>
	<div class="flex-container wrapper">
		<!-- Sidebar -->
		<aside class="sidebar">
			<p>
				{% include image.html file="/images/blog-small-front.jpg" description="" %}
			</p>
		</aside>
		<!-- Content -->
		<section class="content">
			<p>Hey there!</p>
			
			<p>I’m Rishi, and yes, my name means an enlightened person. Pretty cool, right?</p>
			
			<p>Welcome to my personal playground on the web! Here, I share my thoughts, adventures, and a lot about my latest obsession – sports.</p>
			
			<p>I’m a certified geek, always pushing my boundaries and stepping out of my comfort zone.</p>
			
			<p>Books are my best friends. Started with fiction – think Jeffrey Archer, PG Wodehouse, Sherlock Holmes – and now I’m deep into non-fiction. Lately, it’s all about the science of habits and sports performance.</p>
			
			<p>Triathlons? Oh, they’re my thing! What began as a bucket list item has turned into a full-blown passion. Expect to see a lot about my triathlon stories here.</p>
			
			<p>This website? Always a work in progress. I built this with Jekyll, constantly tinkering with layout. I love the no-nonsense, clean vibe of static sites. Hosted on Github Pages because, why not?</p>
			
			<p>Love connecting with like-minded folks! Got something to share or chat about? Drop me a line at rishi at rishisareen dot com.</p>
			
			<p>Follow my adventures on Instagram <a href="https://instagram.com/rishi.sareen">@rishi.sareen</a>.</p>
		</section>
	</div>
</main>

