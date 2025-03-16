document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formulario");

    form.addEventListener("submit", function (event) {
        let isValid = true;

        // Função para exibir erro abaixo do input
        function setError(input, message) {
            let errorSpan = input.nextElementSibling;
            if (!errorSpan || !errorSpan.classList.contains("error-message")) {
                errorSpan = document.createElement("span");
                errorSpan.className = "error-message";
                errorSpan.style.color = "red";
                errorSpan.style.fontSize = "12px";
                errorSpan.style.display = "block";
                input.parentNode.appendChild(errorSpan);
            }
            errorSpan.textContent = message;
            input.classList.add("input-error");
            isValid = false;
        }

        // Função para remover erro quando o usuário começa a digitar
        function clearError(input) {
            let errorSpan = input.nextElementSibling;
            if (errorSpan && errorSpan.classList.contains("error-message")) {
                errorSpan.textContent = "";
            }
            input.classList.remove("input-error");
        }

        // Campos para validação
        const campos = [
            {
                input: document.getElementById("inputName4"),
                validacao: (valor) => /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(valor.trim()),
                mensagemErro: "O nome não pode conter números ou caracteres especiais."
            },
            {
                input: document.getElementById("inputEmail"),
                validacao: (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim()),
                mensagemErro: "E-mail inválido! Digite um endereço válido, como exemplo@dominio.com."
            },
            {
                input: document.getElementById("inputAge"),
                validacao: (valor) => valor >= 0 && valor <= 120,
                mensagemErro: "Idade inválida! Deve estar entre 0 e 120."
            },
            {
                input: document.getElementById("inputYear"),
                validacao: (valor) => {
                    const anoAtual = new Date().getFullYear();
                    return valor >= 1900 && valor <= anoAtual + 2;
                },
                mensagemErro: `Ano letivo inválido! Deve estar entre 1900 e ${new Date().getFullYear() + 2}.`
            },
            {
                input: document.getElementById("inputFone"),
                validacao: (valor) => /^\(\d{2}\) \d{4,5}-\d{4}$/.test(valor),
                mensagemErro: "Telefone inválido! Deve estar no formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX."
            },
            {
                input: document.getElementById("inputMatricula"),
                validacao: (valor) => /^\d{6,}$/.test(valor.trim()),
                mensagemErro: "Matrícula inválida! Deve conter pelo menos 6 dígitos numéricos."
            }
        ];

        // Validação dos campos
        campos.forEach(({ input, validacao, mensagemErro }) => {
            const valor = input.value.trim();
            if (!validacao(valor)) {
                setError(input, mensagemErro);
            } else {
                clearError(input);
            }
        });

        if (!isValid) {
            event.preventDefault();
        }
    });

    // Aplicar evento para remover erro ao digitar
    document.querySelectorAll("input").forEach((input) => {
        input.addEventListener("input", () => clearError(input));
    });

    // Máscara para telefone
    const telefone = document.getElementById("inputFone");
    telefone.addEventListener("input", function () {
        let valor = telefone.value.replace(/\D/g, "");
        if (valor.length > 11) valor = valor.slice(0, 11);

        if (valor.length <= 10) {
            telefone.value = valor.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        } else {
            telefone.value = valor.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        }
    });
});


