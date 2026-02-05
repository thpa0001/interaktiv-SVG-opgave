document.addEventListener("DOMContentLoaded", function () {
  runProgram();
});
const info = [
  {
    lokation: "Brønshøj",
    tekst: "Jeg er født og opvokset i Brønshøj. Det er min hjemby og jeg holder stedet meget kært.",
    billede: "Bronshoj.jpg",
  },
  {
    lokation: "EK",
    tekst: "Her studerer jeg:)",
    billede: "ek.jpg",
  },
  {
    lokation: "Frederiksborggade",
    tekst: "Det her er mit nuværende hjem. Jeg bor i en lejlighed på Frederiksborggade i København K.",
    billede: "frederiksborggade.jpg",
  },
  {
    lokation: "Fabro",
    tekst: "Jeg laver pasta her hos Fabro i Nyboder. Det er et fantastisk sted med lækker mad og gode kollegaer.",
    billede: "fabro.jpg",
  },
  {
    lokation: "Broens",
    tekst: "Jeg arbejder på Broens Gadekøkken om sommeren. Det er et hyggeligt sted ved havnen med lækre drinks",
    billede: "broens.jpg",
  },
];

async function runProgram() {
  let selected;
  let selectedId;
  let active;
  const defaultFill = "#ff4700";
  const activeFill = "#0d0d9a";

  const popover = document.querySelector("#info");

  // 1. Load svg map
  //------------------------------------------------------------------------------------
  let rawSvg = await fetch("kbh.svg");
  let svg = await rawSvg.text();
  document.querySelector("#map").innerHTML = svg;

  // 2. Skift farve ved klik, og vis tekst
  //-----------------------------------------------------------------------
  document.querySelector("#map svg").addEventListener("click", (evt) => clicked(evt));

  //function clicked
  //--------------------------------------------------------------------
  function clicked(evt) {
    evt.stopPropagation();
    // a. find det klikkede element
    //----------------------------------------------
    const circle = evt.target.closest("circle");
    if (!circle) return; // kun prikker skal kunne klikkes

    selected = circle;

    // b. find det klikkede elementets ID
    //---------------------------------------------
    selectedId = selected.id;

    // c. find  det klikkede elements fillfarve
    //---------------------------------------------
    // (vi bruger ikke fillcolor til reset længere, da det gav forkerte farver)

    // d. vis info
    //--------------------------------------------
    info.forEach((info) => {
      if (info.lokation == selectedId) {
        document.querySelector("#tekst").innerHTML = info.tekst;
        document.querySelector("#billede").src = "billeder/" + info.billede;
      }
    });

    // 4. hvis der tidligere har været klikket skal det forige element skifte farve til original
    //------------------------------------------------------------------------------------
    if (active) {
      active.setAttribute("fill", defaultFill);
    }

    //gør det klikkede til det aktive
    //-------------------------------------------------------------------------
    active = selected;

    //skift farve på det valgte
    //-------------------------------------------------------------------------
    active.setAttribute("fill", activeFill);

    popover.showPopover();
  }

  // klik udenfor popover lukker og resetter farven
  //--------------------------------------------------------------------------
  document.addEventListener("click", (evt) => {
    if (!popover.matches(":popover-open")) return;

    // hvis man klikker inde i popover -> gør ingenting
    if (evt.target.closest("#info")) return;

    popover.hidePopover();

    if (active) {
      active.setAttribute("fill", defaultFill);
      active = null;
    }
  });
}
