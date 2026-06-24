# Receptová šablona

Jednoduchý lokální projekt pro vytváření receptů v HTML šabloně s možností tisku nebo uložení do PDF.

Projekt slouží jako editor receptů, kde se vyplní název, volitelný popis, suroviny a postup. Zadané údaje se následně propíšou do čisté tiskové šablony ve formátu A4.

## Použité technologie

* HTML
* CSS
* JavaScript
* Bez frameworku
* Bez backendu
* Bez databáze

Projekt běží lokálně v prohlížeči.

## Funkce

Aktuální verze umí:

* vyplnit název receptu,
* zapnout nebo vypnout popis receptu,
* přidávat a odebírat suroviny,
* přidávat a odebírat kroky postupu,
* automaticky číslovat kroky postupu,
* aktualizovat náhled receptu,
* vyčistit recept do prázdné šablony,
* vytisknout recept nebo ho uložit jako PDF,
* vytvořit pokračovací stránku, pokud je recept delší.

## Struktura projektu

```text
Recepty_Template/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## Jak projekt spustit

1. Otevři složku projektu.
2. Spusť soubor `index.html` v prohlížeči.
3. Vyplň recept v editoru.
4. Klikni na tlačítko `Aktualizovat náhled`.
5. Pro tisk nebo uložení do PDF použij tlačítko `Tisk / Uložit jako PDF`.

## Tisk a export do PDF

Export do PDF je řešený přes tiskovou funkci prohlížeče.

Po kliknutí na tlačítko `Tisk / Uložit jako PDF` se otevře tiskový dialog. V něm je možné vybrat například:

* fyzickou tiskárnu,
* nebo možnost `Uložit jako PDF`.

Editor a ovládací tlačítka jsou v tiskové verzi skrytá.

## Popis receptu

Popis receptu je volitelný.

Pokud není zaškrtnutá volba `Použít popis receptu`, popis se do výsledné šablony vůbec nevloží. Výsledný recept pak obsahuje pouze:

* název,
* suroviny,
* postup.

## Suroviny

Každá surovina má dvě části:

* množství,
* název suroviny.

Příklad:

```text
100 g     rýže
150 g     kuřecího masa
          sůl
```

Pokud surovina nepotřebuje množství, pole množství může zůstat prázdné.

## Postup

Postup je rozdělený do jednotlivých kroků. Kroky jsou číslované automaticky podle aktuálního pořadí.

Při odebrání kroku se číslování znovu přepočítá.

## Aktuální omezení

Projekt je zatím jednoduchá lokální šablona. Aktuálně neobsahuje:

* ukládání receptů do souboru,
* načítání receptů ze souboru,
* databázi receptů,
* obrázky receptů,
* přihlašování,
* online verzi.

## Možná budoucí rozšíření

Do budoucna je možné přidat:

* ukládání receptu do JSON,
* načítání receptu z JSON,
* seznam uložených receptů,
* vyhledávání receptů,
* kategorie a štítky,
* obrázek receptu,
* lepší vícestránkové zalamování,
* export více receptů najednou,
* desktopovou aplikaci přes Electron.

## Poznámka

Projekt je vytvořený jako cvičný a praktický HTML/CSS/JavaScript projekt. Cílem je mít jednoduchý editor receptů, který vytvoří čistou tiskovou šablonu vhodnou pro PDF nebo fyzický tisk.
::: 
