function cpu(totem) {
    let ramCard = document.getElementById(`cardRam${totem.charAt(totem.length - 1)}`);
    let cpuCard = document.getElementById(`cardCpu${totem.charAt(totem.length - 1)}`);
    let discoCard = document.getElementById(`cardDisco${totem.charAt(totem.length - 1)}`);

    if (window.getComputedStyle(cpuCard).display === "none") {
        cpuCard.style.display = "flex";
    } else {
        cpuCard.style.display = "none";
    }

    //
    if (window.getComputedStyle(ramCard).display === "flex" && 
    window.getComputedStyle(cpuCard).display === "flex" &&
    window.getComputedStyle(discoCard).display === "flex") {
        
    }

    //
    if (window.getComputedStyle(ramCard).display === "flex" && 
        window.getComputedStyle(cpuCard).display === "flex" &&
        window.getComputedStyle(discoCard).display === "none") {
            discoCard.style.display = "none";
    } 

    //
    if (window.getComputedStyle(ramCard).display === "flex" &&
        window.getComputedStyle(cpuCard).display === "none" &&
        window.getComputedStyle(discoCard).display === "flex") {
            
            cpuCard.style.display = "none";
    }

    //
    if (window.getComputedStyle(ramCard).display === "none" && 
        window.getComputedStyle(cpuCard).display === "flex" && 
        window.getComputedStyle(discoCard).display === "flex") {
            ramCard.style.display = "none";
    }

    //
    if (window.getComputedStyle(ramCard).display === "none" && 
        window.getComputedStyle(cpuCard).display === "flex" &&
        window.getComputedStyle(discoCard).display === "none") {
            ramCard.style.display = "none";
    }
    
    //
    if (window.getComputedStyle(ramCard).display === "flex" && 
        window.getComputedStyle(cpuCard).display === "none" && 
        window.getComputedStyle(discoCard).display === "none") {
            cpuCard.style.display = "none";
    } 

    //
    if (window.getComputedStyle(ramCard).display === "none" && 
        window.getComputedStyle(cpuCard).display === "none" && 
        window.getComputedStyle(discoCard).display === "flex") {
            ramCard.style.display = "none";
            cpuCard.style.display = "none";
    }
}

function ram(totem) {
    let ramCard = document.getElementById(`cardRam${totem.charAt(totem.length - 1)}`);
    let cpuCard = document.getElementById(`cardCpu${totem.charAt(totem.length - 1)}`);
    let discoCard = document.getElementById(`cardDisco${totem.charAt(totem.length - 1)}`);

    if(ramCard.style.display === "none") {
        ramCard.style.display = "flex";
    } else {
        ramCard.style.display = "none";
    }

    //
    if (window.getComputedStyle(ramCard).display === "flex" && 
    window.getComputedStyle(cpuCard).display === "flex" &&
    window.getComputedStyle(discoCard).display === "flex") {
        
    }

    //
    if (window.getComputedStyle(ramCard).display === "flex" && 
        window.getComputedStyle(cpuCard).display === "flex" &&
        window.getComputedStyle(discoCard).display === "none") {
            discoCard.style.display = "none";
    } 

    //
    if (window.getComputedStyle(ramCard).display === "flex" &&
        window.getComputedStyle(cpuCard).display === "none" &&
        window.getComputedStyle(discoCard).display === "flex") {
            
            cpuCard.style.display = "none";
    }

    //
    if (window.getComputedStyle(ramCard).display === "none" && 
        window.getComputedStyle(cpuCard).display === "flex" && 
        window.getComputedStyle(discoCard).display === "flex") {
            ramCard.style.display = "none";
    }

    //
    if (window.getComputedStyle(ramCard).display === "none" && 
        window.getComputedStyle(cpuCard).display === "flex" &&
        window.getComputedStyle(discoCard).display === "none") {
            ramCard.style.display = "none";
    }
    
    //
    if (window.getComputedStyle(ramCard).display === "flex" && 
        window.getComputedStyle(cpuCard).display === "none" && 
        window.getComputedStyle(discoCard).display === "none") {
            cpuCard.style.display = "none";
    } 

    //
    if (window.getComputedStyle(ramCard).display === "none" && 
        window.getComputedStyle(cpuCard).display === "none" && 
        window.getComputedStyle(discoCard).display === "flex") {
            ramCard.style.display = "none";
            cpuCard.style.display = "none";
    }
}

function disco(totem) {
    let ramCard = document.getElementById(`cardRam${totem.charAt(totem.length - 1)}`);
    let cpuCard = document.getElementById(`cardCpu${totem.charAt(totem.length - 1)}`);
    let discoCard = document.getElementById(`cardDisco${totem.charAt(totem.length - 1)}`);

    if (window.getComputedStyle(discoCard).display === "none") {
        discoCard.style.display = "flex";
    } else {
        discoCard.style.display = "none";
    }

    //
    if (window.getComputedStyle(ramCard).display === "flex" && 
    window.getComputedStyle(cpuCard).display === "flex" &&
    window.getComputedStyle(discoCard).display === "flex") {
        
    }

    //
    if (window.getComputedStyle(ramCard).display === "flex" && 
        window.getComputedStyle(cpuCard).display === "flex" &&
        window.getComputedStyle(discoCard).display === "none") {
            discoCard.style.display = "none";
    } 

    //
    if (window.getComputedStyle(ramCard).display === "flex" &&
        window.getComputedStyle(cpuCard).display === "none" &&
        window.getComputedStyle(discoCard).display === "flex") {
            cpuCard.style.display = "none";
    }

    //
    if (window.getComputedStyle(ramCard).display === "none" && 
        window.getComputedStyle(cpuCard).display === "flex" && 
        window.getComputedStyle(discoCard).display === "flex") {
            ramCard.style.display = "none";
    }

    //
    if (window.getComputedStyle(ramCard).display === "none" && 
        window.getComputedStyle(cpuCard).display === "flex" &&
        window.getComputedStyle(discoCard).display === "none") {
            ramCard.style.display = "none";
    }
    
    //
    if (window.getComputedStyle(ramCard).display === "flex" && 
        window.getComputedStyle(cpuCard).display === "none" && 
        window.getComputedStyle(discoCard).display === "none") {
            cpuCard.style.display = "none";
    } 

    //
    if (window.getComputedStyle(ramCard).display === "none" && 
        window.getComputedStyle(cpuCard).display === "none" && 
        window.getComputedStyle(discoCard).display === "flex") {
            ramCard.style.display = "none";
            cpuCard.style.display = "none";
    }
}
function escolheTotem() {
    const selectTotem = document.getElementById("escolheTotem");
    const valorSelecionado = selectTotem.value;

    const totemUmDiv = document.getElementById("totem1");
    const totemDoisDiv = document.getElementById("totem2");
    const totemTresDiv = document.getElementById("totem3");

    

    const totemDaVez = document.getElementById("totemDaVez");

    if (valorSelecionado == "totemUm") {
        totemUmDiv.style.display = "flex";
        totemDoisDiv.style.display = "none";
        totemTresDiv.style.display = "none";

        checkUm.style.display = "grid";
        checkDois.style.display = "none";
        checkTres.style.display = "none";
    }
    if (valorSelecionado == "totemDois") {
        totemUmDiv.style.display = "none";
        totemDoisDiv.style.display = "flex";
        totemTresDiv.style.display = "none";

        checkUm.style.display = "none";
        checkDois.style.display = "grid";
        checkTres.style.display = "none";
    }
    if (valorSelecionado == "totemTres") {
        totemUmDiv.style.display = "none";
        totemDoisDiv.style.display = "none";
        totemTresDiv.style.display = "flex";

        checkUm.style.display = "none";
        checkDois.style.display = "none";
        checkTres.style.display = "grid";
    }
}
function escolherTotem() {
    const selectTotem = document.getElementById("escolheTotem");
    const valorSelecionado = selectTotem.value;

    const checkUm = document.getElementById("checklist");
    const checkDois = document.getElementById("checklist2");
    const checkTres = document.getElementById("checklist3");

    const totemUmDisco = document.getElementById("totemDisco1");
    const totemDoisDisco = document.getElementById("totemDisco2");
    const totemTresDisco = document.getElementById("totemDisco3");

    const totemRC1 = document.getElementById("totemRamCpu1");
    const totemRC2 = document.getElementById("totemRamCpu2");
    const totemRC3 = document.getElementById("totemRamCpu3");
    

    // Selecione as divs corretas para mostrar ou esconder com base na seleção
    if (valorSelecionado == "totemUm") {
        totemUmDisco.style.display = "flex";
        totemDoisDisco.style.display = "none";
        totemTresDisco.style.display = "none";

        checkUm.style.display = "grid";
        checkDois.style.display = "none";
        checkTres.style.display = "none";

        totemRC1.style.display = "flex";
        totemRC2.style.display = "none";
        totemRC3.style.display = "none";

    }
    if (valorSelecionado == "totemDois") {
        totemUmDisco.style.display = "none";
        totemDoisDisco.style.display = "flex";
        totemTresDisco.style.display = "none";

        checkUm.style.display = "none";
        checkDois.style.display = "grid";
        checkTres.style.display = "none";

        totemRC1.style.display = "none";
        totemRC2.style.display = "flex";
        totemRC3.style.display = "none";
    }
    if (valorSelecionado == "totemTres") {
        totemUmDisco.style.display = "none";
        totemDoisDisco.style.display = "none";
        totemTresDisco.style.display = "flex"; // Mostrar RAM 3

        checkUm.style.display = "none";
        checkDois.style.display = "none";
        checkTres.style.display = "grid";
    
        totemRC1.style.display = "none";
        totemRC2.style.display = "none";
        totemRC3.style.display = "flex";
    }
}

