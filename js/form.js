// exibir se sim
function toggleCampoCondicional(selectId, campoId, inputId) {
    const select = document.getElementById(selectId);
    const campo = document.getElementById(campoId);
    const input = document.getElementById(inputId);

    if (select.value === 'sim' || select.value === 'particular' || select.value === 'municipal') {
        campo.style.display = 'block';
    } else {
        campo.style.display = 'none';
        input.value = '';
    }

    // if (select.value === 'particular' || 'municipal') {
    //     campo.style.display = 'block';
    // } else {
    //     campo.style.display = 'none';
    //     input.value = '';
    // }
}


// form by steps
const steps = document.querySelectorAll('.step');
    let currentStep = 0;
    
    // Exibe a etapa de acordo com o índice
    function showStep(index) {
        steps.forEach((step, i) => {
        step.classList.toggle('active', i === index);
        });
    }
    
    // Avança para a próxima etapa
    function nextStep() {
        if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
        }
    }
    
    // Volta para a etapa anterior
    function prevStep() {
        if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
        }
    }
    
    // Exibe a primeira etapa ao carregar a página
    document.addEventListener('DOMContentLoaded', () => {
        showStep(currentStep);
    });


// Máscara de telefone
function aplicarMascaraTelefone(input) {
    input.addEventListener('input', function (e) {
        let valor = e.target.value.replace(/\D/g, '');

        if (valor.length > 11) valor = valor.slice(0, 11);

        if (valor.length <= 10) {
            valor = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else {
            valor = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
        }

        e.target.value = valor;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    aplicarMascaraTelefone(document.getElementById('inputMotherFone'));
    aplicarMascaraTelefone(document.getElementById('inputMotherWorkFone'));
    aplicarMascaraTelefone(document.getElementById('inputFatherFone'));
    aplicarMascaraTelefone(document.getElementById('inputFatherWorkFone'));
    aplicarMascaraTelefone(document.getElementById('inputFone'));
});

// Mascara de CPF
function aplicarMascaraCPF(input) {
    input.addEventListener("input", function () {
        let valor = input.value.replace(/\D/g, "");

        // Aplica a máscara
        if (valor.length > 11) valor = valor.slice(0, 11);
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        input.value = valor;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const camposCPF = document.querySelectorAll("input[type='number'][id*='CPF']");
    camposCPF.forEach(input => {
        
        input.type = "text";
        aplicarMascaraCPF(input);
    });
});

// Mascara RG
function aplicarMascaraRG(input) {
    input.addEventListener("input", function () {
        let valor = input.value.replace(/\D/g, ""); // Remove tudo que não for número

        // Aplica a máscara
        if (valor.length > 9) valor = valor.slice(0, 9);
        valor = valor.replace(/(\d{2})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1})$/, "$1-$2");

        input.value = valor;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const camposRG = document.querySelectorAll("input[type='number'][id*='RG']");
    camposRG.forEach(input => {
        input.type = "text"; // Permitir pontos e traço
        aplicarMascaraRG(input);
    });
});

