---
title: Windows 11 Enterprise Migration
short_title: Windows 11 Migration
summary: Led comprehensive Windows 11 migration across 48 medical sites, deploying 1,200+ machines with custom automation.
overview: Managed the complete lifecycle of a Windows 11 migration at Arizona Community Physicians. Developed custom PowerShell scripts to automate deployment tasks, reducing per-machine setup from 2 hours to 15 minutes. Implemented SmartDeploy integration, created automated asset tracking with Snipe-IT, and designed a naming scheme using site prefix + serial number that simplified inventory across all sites.
employer: Arizona Community Physicians
employer_short: ACP
period: Jul 2024 to Jan 2026
icon: monitor
order: 1
featured: true
rotator: true
headline: 1,200+ | Machines Deployed
headline_fixed: true
tags:
  - Windows 11
  - PowerShell
  - SmartDeploy
  - WDS
  - Enterprise
stats:
  - 1,200+ | Machines Deployed
  - 48 | Sites Managed
  - 87% | Time Saved
highlights:
  - Custom PowerShell automation for deployment pipeline
  - SmartDeploy image management and customization
  - Automated computer naming with BIOS asset tagging
  - Snipe-IT integration for real-time inventory tracking
  - Auto-logon user creation automation
  - Zero disruption to clinical operations
---
## Problem and goal

Arizona Community Physicians ran a main office with 200+ employees and about 48 clinics, from under 5 people to nearly 60. Microsoft ended support for Windows 10 on October 14, 2025, and ACP set an internal deadline of December 2025 to be on Windows 11. The goal was to move every machine with as little disruption as possible. Files, folders, and software had to be waiting for each user exactly where they left them, so patient care never felt the change.

## Stakeholders

- Leadership and the IT department requested and approved the project.
- End users were physicians and medical assistants at the clinics, plus admin, finance, billing, and executive staff at the main office.
- Site coordinators confirmed equipment needs and timing for their sites.
- The IT director placed hardware orders from my counts.

## Approach

- I surveyed every site in person and cataloged every desktop and laptop and what each user should have.
- The survey showed which machines could be upgraded and which had to be replaced because they could not run Windows 11.
- I gave the replacement counts to the IT director, who cross-checked them with each site coordinator. Orders went out in batches as site budgets were ready.
- I met with each site coordinator, with a floor map, to agree on how deployment day would run.
- Upgrades were tied to the OneDrive migration to move people off mapped drives. Machines with proprietary software or customizations that could not be rebuilt on a new image were upgraded in place.
- Everything was staged before deployment day. OneDrive was set up and browser favorites and passwords were synced first (Edge, Chrome, Firefox, or whatever the user preferred), so Desktop, Documents, and Pictures were backed up before anything was touched. I handled Downloads manually on the back end when needed.
- Swaps happened on days off, lunches, and breaks. In-place upgrades happened after hours.
- Alongside the migration, I built the organization's first inventory and asset management system in Snipe-IT and designed a new naming scheme, site prefix plus serial number, that was rolled out across the fleet.
- I planned the project and carried the first half of the deployments alone, including one site of about 60 people, and performed every in-place upgrade myself. Mark P. joined partway through, and the two of us completed the work.

## Risks and rollback

- The biggest risk was losing a user's files. A missing file can mean a canceled appointment, and a few physicians said so. Because OneDrive and browser sync were set up first, they signed in and everything appeared. No appointments were canceled.
- Some machines ran older software with perpetual licenses that could not be reinstalled. Those were flagged in tickets and Snipe-IT and always got in-place upgrades, never wipes.
- Veeam backups of the machines were ready for a bare-metal restore if anything failed. None was ever needed.

## Results

- 1,200+ machines deployed.
- Per-machine deployment time dropped from 2 hours to 15 minutes, an 87% reduction.
- Planning began in December 2024, and the project finished by ACP's company deadline.
- Zero disruption to clinical operations, with no restores needed.
- The first inventory system and a standard naming scheme gave the organization a reliable record of every machine it deployed.

## What I'd do differently

Two changes would have shortened the timeline. One is a single authority over hardware purchasing, since each site's budget and timing set the pace. The other is dedicated deployment staff from day one, since I carried the first half alone.
