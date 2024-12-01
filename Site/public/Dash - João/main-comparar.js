function escolherTotemCompara() {
    const selectTotem = document.getElementById("escolheTotemCompara");
    const valorSelecionado = selectTotem.value;

    const checkUm = document.getElementById("checklist-compara1");
    const checkDois = document.getElementById("checklist-compara2");
    const checkTres = document.getElementById("checklist-compara3");

    const totemUmDisco = document.getElementById("totemDiscoCompara1");
    const totemDoisDisco = document.getElementById("totemDiscoCompara2");
    const totemTresDisco = document.getElementById("totemDiscoCompara3");

    const totemRC1 = document.getElementById("totemRamCpuCompara1");
    const totemRC2 = document.getElementById("totemRamCpuCompara2");
    const totemRC3 = document.getElementById("totemRamCpuCompara3");

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
        totemTresDisco.style.display = "flex";

        checkUm.style.display = "none";
        checkDois.style.display = "none";
        checkTres.style.display = "grid";

        totemRC1.style.display = "none";
        totemRC2.style.display = "none";
        totemRC3.style.display = "flex";
    }
}

function cpuCompara(totem) {
    let ramCard = document.getElementById(`cardRamCompara${totem.charAt(totem.length - 1)}`);
    let cpuCard = document.getElementById(`cardCpuCompara${totem.charAt(totem.length - 1)}`);
    let discoCard = document.getElementById(`cardDiscoCompara${totem.charAt(totem.length - 1)}`);

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

function ramCompara(totem) {
    let ramCard = document.getElementById(`cardRamCompara${totem.charAt(totem.length - 1)}`);
    let cpuCard = document.getElementById(`cardCpuCompara${totem.charAt(totem.length - 1)}`);
    let discoCard = document.getElementById(`cardDiscoCompara${totem.charAt(totem.length - 1)}`);

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

function discoCompara(totem) {
    let ramCard = document.getElementById(`cardRamCompara${totem.charAt(totem.length - 1)}`);
    let cpuCard = document.getElementById(`cardCpuCompara${totem.charAt(totem.length - 1)}`);
    let discoCard = document.getElementById(`cardDiscoCompara${totem.charAt(totem.length - 1)}`);

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

// asd

function escolherTotemComparar() {
    const selectTotem = document.getElementById("escolheTotemComparar");
    const valorSelecionado = selectTotem.value;

    const checkUm = document.getElementById("checklist-comparar1");
    const checkDois = document.getElementById("checklist-comparar2");
    const checkTres = document.getElementById("checklist-comparar3");

    const totemUmDisco = document.getElementById("totemDiscoComparar1");
    const totemDoisDisco = document.getElementById("totemDiscoComparar2");
    const totemTresDisco = document.getElementById("totemDiscoComparar3");

    const totemRC1 = document.getElementById("totemRamCpuComparar1");
    const totemRC2 = document.getElementById("totemRamCpuComparar2");
    const totemRC3 = document.getElementById("totemRamCpuComparar3");

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
        totemTresDisco.style.display = "flex";

        checkUm.style.display = "none";
        checkDois.style.display = "none";
        checkTres.style.display = "grid";

        totemRC1.style.display = "none";
        totemRC2.style.display = "none";
        totemRC3.style.display = "flex";
    }
}

function cpuComparar(totem) {
    let ramCard = document.getElementById(`cardRamComparar${totem.charAt(totem.length - 1)}`);
    let cpuCard = document.getElementById(`cardCpuComparar${totem.charAt(totem.length - 1)}`);
    let discoCard = document.getElementById(`cardDiscoComparar${totem.charAt(totem.length - 1)}`);

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

function ramComparar(totem) {
    let ramCard = document.getElementById(`cardRamComparar${totem.charAt(totem.length - 1)}`);
    let cpuCard = document.getElementById(`cardCpuComparar${totem.charAt(totem.length - 1)}`);
    let discoCard = document.getElementById(`cardDiscoComparar${totem.charAt(totem.length - 1)}`);

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

function discoComparar(totem) {
    let ramCard = document.getElementById(`cardRamComparar${totem.charAt(totem.length - 1)}`);
    let cpuCard = document.getElementById(`cardCpuComparar${totem.charAt(totem.length - 1)}`);
    let discoCard = document.getElementById(`cardDiscoComparar${totem.charAt(totem.length - 1)}`);

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