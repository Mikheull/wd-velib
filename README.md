<p align="center">
    <img src="https://raw.githubusercontent.com/Mikheull/wd-velib/dev/public/images/Weekdev_banner%402x.png" />
    <h2 align="center">Weekdev #1 | Velib application with prediction</h2>
</p> 
<p align="center">By Mikhael Bailly</p>

[![Build Status](https://travis-ci.org/Mikheull/wd-velib.svg?branch=dev)](https://travis-ci.org/Mikheull/wd-velib)
![GitHub](https://img.shields.io/github/license/Mikheull/wd-velib)

## 🚀 Intro
Welcome to the first edition of WeekDev 2021. The WeekDev is a challenge that I launched myself, where I develop an idea in maximum 1 week. At the end of this period I would no longer edit the code ! The goal is to improve myself in development and discover new techniques, new languages.

**Velib X Waze**<br>

The idea came from my daily use of the Velib app in Paris. During these last months the stations are regularly empty, so I wanted to find a way to be sure to get a bike. Like Waze, I will try to predict the number of bikes a station will have in the coming days. Based on the history of the station.

## Table of Contents
1. [Informations](#informations)
2. [Datas](#datas)
3. [Tasks](#tasks)
4. [Tools used](#tools-used)
5. [Installation](#installation)
6. [Configuration](#configuration)
7. [Usage](#usage)


## Informations
The challenge began on Thursday 15 January 2021 and will be ended on Thursday 22 January 2021 ! It aims to bring me knowledge in NextJS and DataMining. During the development, I work on the branch "dev".

## Datas
Velib provides its data free of charge on the opendata site of Paris API
-  [Vélib - Vélos et bornes - Disponibilité temps réel](https://opendata.paris.fr/explore/dataset/velib-disponibilite-en-temps-reel/information/) to get the real time stations data 
-  [Vélib - Localisation et caractéristique des stations](https://opendata.paris.fr/explore/dataset/velib-emplacement-des-stations/information/) to get a list of the stations
I store station data every 30 minutes over a period of 4 weeks in the past in a Mongodb database (~ 2 000 000 lines).

## Tasks
I created a Kanban table to reference all my tasks available [here](https://github.com/Mikheull/wd-velib/projects/1). It will be regularly updated<br>
Main tasks :
- Get a map with all stations
- Display stations popins with informations
- Analyze the last 4 weeks
- Make a prediction about the coming days
- Display local meteo


## Tools used
- NextJS
- MapBox
- Openweathermap
- MongoDB

## Installation

Use `git clone` to install this app.

```bash
git clone https://github.com/Mikheull/wd-velib
npm install
```

## Configuration

Create a `.env` file in root directory and write the configuration below.

```bash
MAPBOX_ACCESS_TOKEN=xxxxxxx
METEO_ACCESS_TOKEN=xxxxxxx
```

## Usage

```bash
npm run dev
```
