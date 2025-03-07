// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: "https://scilus.github.io",
	base: "/nf-neuro",
	integrations: [
		starlight({
			title: 'nf-neuro',
			logo: {
				light: './src/assets/nf-neuro_logo_light.svg',
				dark: './src/assets/nf-neuro_logo_dark.svg',
				replacesTitle: true,
			},
			customCss: [
				'./src/styles/custom.css',
			],
			social: {
				github: 'https://github.com/scilus/nf-neuro.git',
			},
			sidebar: [
				{
					label: 'Custom pipeline',
					items: [
						{ label: 'Setup your computer', slug: 'custom-pipeline/setup' },
						{ label: 'Example Pipeline', slug: 'custom-pipeline/prototyping' },
					],
				},
				{	
					label: 'How-to',
					items: [
						{ label: 'Top-5 Operators', slug: 'how-to/top-5-operators' },
						{ label: 'Custom Subworkflows', slug: 'how-to/custom-subworkflows' },
					],
				},
				{
					label: 'Advanced Tutorials',
					items: [
						{ label: 'BIDS Input', slug: 'advanced-tutorials/bidsinput' },
						{ label: 'BIDS Output', slug: 'advanced-tutorials/bidsoutput' },
						{ label: 'MultiQC', slug: 'advanced-tutorials/multiqc' },
					],
				},
				{
					label: 'Contribute to nf-neuro',
					items: [
						{ label: 'Setup your computer', slug: 'contribute/setup' },
						{ label: 'Create your module',
							items: [
								'contribute/create-your-module/template',
								'contribute/create-your-module/main',
								'contribute/create-your-module/documentation',
								'contribute/create-your-module/tests',
								'contribute/create-your-module/arguments',
								'contribute/create-your-module/submit',
								'contribute/create-your-module/infrastructure',
								'contribute/create-your-module/resources',
							]
						},
						{ label: 'Create your subworkflow',
							items: [
								'contribute/create-your-subworkflow/subworkflows',
							]
						}
					]
				},
				{
					label: 'API Documentation',
					autogenerate: { directory: 'api' },
					collapsed: true,
				},
			],
		}),
	],
});
