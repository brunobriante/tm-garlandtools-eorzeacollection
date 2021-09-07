// ==UserScript==
// @name         Garland Tools to Eorzea Collection
// @namespace    http://tampermonkey.briante.net/
// @version      0.1
// @description  open itens in garland tools when looking at a glamour set
// @copyright    2021, Bruno Briante (https://bruno.briante.net)
// @author       Bruno Briante
// @license      MIT; https://github.com/brunobriante/tm-garlandtools-eorzeacollection/blob/main/LICENSE
// @match        https://ffxiv.eorzeacollection.com/glamour/**/*
// @icon         https://www.google.com/s2/favicons?domain=ffxiv.eorzeacollection.com
// @supportURL   https://github.com/brunobriante/tm-garlandtools-eorzeacollection
// @grant        GM.xmlHttpRequest
// @grant        GM.addElement
// ==/UserScript==



(function () {
    'use strict';

    let items = document.getElementsByClassName("b-info-box-item-wrapper");

    for (let item of items) {
        console.log(item)
        GM.xmlHttpRequest({
            responseType: "json",
            method: "GET",
            url: "https://xivapi.com/search?indexes=item&string=" + encodeURIComponent(item.getElementsByClassName("c-gear-slot-item-name")[0].textContent),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function (response) {
                let responseData = response.response.Results[0] || null;
                if (responseData) {
                    GM.addElement(item.getElementsByClassName("c-gear-slot-item")[0], 'a', {
                        href: "https://www.garlandtools.org/db/#item/" + responseData.ID,
                        style: "position:absolute;right:0;top:calc(50% - 26px);color:#636363;font-size:11px",
                    }).then(function (element) {
                        element.text = "see in garland tools"
                    });
                }
            }
        });
    }
})();