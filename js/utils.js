// Utilitários para a aplicação E-Commerce

// ============================================
// MANIPULAÇÃO DE DATAS
// ============================================

/**
 * Formata uma data para o formato português
 * @param {Date|string} date - Data a formatar
 * @returns {string} Data formatada
 */
function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

/**
 * Formata uma data com hora
 * @param {Date|string} date - Data a formatar
 * @returns {string} Data e hora formatadas
 */
function formatDateTime(date) {
    const d = new Date(date);
    return d.toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Calcula a diferença de dias entre duas datas
 * @param {Date} date1 - Primeira data
 * @param {Date} date2 - Segunda data
 * @returns {number} Diferença em dias
 */
function dateDiffInDays(date1, date2) {
    const diff = Math.abs(date1 - date2);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// ============================================
// VALIDAÇÃO DE FORMULÁRIOS
// ============================================

/**
 * Valida um email
 * @param {string} email - Email a validar
 * @returns {boolean} True se o email for válido
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Valida um número de telefone português
 * @param {string} phone - Número de telefone
 * @returns {boolean} True se o telefone for válido
 */
function isValidPortuguesePhone(phone) {
    const re = /^(\+351)?\s?9[1236]\d{7}$/;
    return re.test(phone.replace(/\s/g, ''));
}

/**
 * Valida um NIF português
 * @param {string} nif - NIF a validar
 * @returns {boolean} True se o NIF for válido
 */
function isValidNIF(nif) {
    if (!/^\d{9}$/.test(nif)) return false;
    
    const sum = nif.split('').reduce((acc, digit, idx) => {
        return acc + parseInt(digit) * (9 - idx);
    }, 0);
    
    const remainder = sum % 11;
    const checkDigit = remainder < 2 ? 0 : 11 - remainder;
    
    return parseInt(nif[8]) === checkDigit;
}

/**
 * Valida um código postal português
 * @param {string} postalCode - Código postal
 * @returns {boolean} True se o código postal for válido
 */
function isValidPostalCode(postalCode) {
    const re = /^\d{4}-\d{3}$/;
    return re.test(postalCode);
}

/**
 * Valida uma password
 * @param {string} password - Password a validar
 * @param {number} minLength - Comprimento mínimo (default: 6)
 * @returns {object} Resultado da validação
 */
function validatePassword(password, minLength = 6) {
    const errors = [];
    
    if (password.length < minLength) {
        errors.push(`A password deve ter pelo menos ${minLength} caracteres`);
    }
    
    if (!/[A-Z]/.test(password)) {
        errors.push('A password deve conter pelo menos uma letra maiúscula');
    }
    
    if (!/[a-z]/.test(password)) {
        errors.push('A password deve conter pelo menos uma letra minúscula');
    }
    
    if (!/\d/.test(password)) {
        errors.push('A password deve conter pelo menos um número');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

// ============================================
// MANIPULAÇÃO DE STRINGS
// ============================================

/**
 * Formata um número como preço em euros
 * @param {number} amount - Valor a formatar
 * @returns {string} Valor formatado
 */
function formatPrice(amount) {
    return new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    }).format(amount);
}

/**
 * Trunca um texto e adiciona reticências
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Comprimento máximo
 * @returns {string} Texto truncado
 */
function truncateText(text, maxLength = 100) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
}

/**
 * Capitaliza a primeira letra de cada palavra
 * @param {string} text - Texto a capitalizar
 * @returns {string} Texto capitalizado
 */
function capitalizeWords(text) {
    return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

/**
 * Remove acentos de uma string
 * @param {string} text - Texto com acentos
 * @returns {string} Texto sem acentos
 */
function removeAccents(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// ============================================
// MANIPULAÇÃO DE ARRAYS E OBJETOS
// ============================================

/**
 * Remove duplicados de um array
 * @param {Array} array - Array com possíveis duplicados
 * @returns {Array} Array sem duplicados
 */
function removeDuplicates(array) {
    return [...new Set(array)];
}

/**
 * Ordena um array de objetos por uma propriedade
 * @param {Array} array - Array a ordenar
 * @param {string} property - Propriedade para ordenar
 * @param {boolean} ascending - Ordem ascendente (true) ou descendente (false)
 * @returns {Array} Array ordenado
 */
function sortByProperty(array, property, ascending = true) {
    return array.sort((a, b) => {
        const aValue = a[property];
        const bValue = b[property];
        
        if (aValue < bValue) return ascending ? -1 : 1;
        if (aValue > bValue) return ascending ? 1 : -1;
        return 0;
    });
}

/**
 * Agrupa um array de objetos por uma propriedade
 * @param {Array} array - Array a agrupar
 * @param {string} property - Propriedade para agrupar
 * @returns {Object} Objeto com os grupos
 */
function groupBy(array, property) {
    return array.reduce((groups, item) => {
        const key = item[property];
        if (!groups[key]) groups[key] = [];
        groups[key].push(item);
        return groups;
    }, {});
}

/**
 * Filtra um array com múltiplos critérios
 * @param {Array} array - Array a filtrar
 * @param {Object} filters - Objeto com critérios de filtro
 * @returns {Array} Array filtrado
 */
function filterArray(array, filters) {
    return array.filter(item => {
        return Object.entries(filters).every(([key, value]) => {
            if (value === undefined || value === null) return true;
            if (typeof value === 'function') return value(item[key]);
            return item[key] === value;
        });
    });
}

// ============================================
// COOKIES E LOCAL STORAGE
// ============================================

/**
 * Define um cookie
 * @param {string} name - Nome do cookie
 * @param {string} value - Valor do cookie
 * @param {number} days - Dias para expirar
 */
function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

/**
 * Obtém um cookie
 * @param {string} name - Nome do cookie
 * @returns {string|null} Valor do cookie ou null
 */
function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

/**
 * Remove um cookie
 * @param {string} name - Nome do cookie
 */
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
}

/**
 * Salva um objeto no localStorage com timestamp
 * @param {string} key - Chave para salvar
 * @param {any} value - Valor a salvar
 */
function saveToLocalStorage(key, value) {
    const data = {
        value: value,
        timestamp: new Date().getTime()
    };
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Carrega um objeto do localStorage e verifica se expirou
 * @param {string} key - Chave a carregar
 * @param {number} maxAge - Idade máxima em milissegundos
 * @returns {any|null} Valor carregado ou null se expirado
 */
function loadFromLocalStorage(key, maxAge = null) {
    const item = localStorage.getItem(key);
    if (!item) return null;
    
    try {
        const data = JSON.parse(item);
        
        if (maxAge && new Date().getTime() - data.timestamp > maxAge) {
            localStorage.removeItem(key);
            return null;
        }
        
        return data.value;
    } catch (e) {
        return null;
    }
}

// ============================================
// UI E ANIMAÇÕES
// ============================================

/**
 * Mostra uma mensagem de alerta
 * @param {string} message - Mensagem a mostrar
 * @param {string} type - Tipo de alerta (success, error, warning, info)
 * @param {number} duration - Duração em milissegundos (default: 5000)
 */
function showAlert(message, type = 'info', duration = 5000) {
    // Remove alertas anteriores
    const existingAlert = document.querySelector('.global-alert');
    if (existingAlert) existingAlert.remove();
    
    // Cria novo alerta
    const alert = document.createElement('div');
    alert.className = `global-alert alert alert-${type}`;
    alert.innerHTML = `
        <i class="fas fa-${getAlertIcon(type)}"></i>
        <span>${message}</span>
        <button class="close-alert">&times;</button>
    `;
    
    // Estilos
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        max-width: 500px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Evento para fechar
    alert.querySelector('.close-alert').addEventListener('click', () => {
        alert.remove();
    });
    
    // Adiciona ao documento
    document.body.appendChild(alert);
    
    // Remove automaticamente após a duração
    if (duration > 0) {
        setTimeout(() => {
            if (alert.parentNode) {
                alert.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => alert.remove(), 300);
            }
        }, duration);
    }
    
    // Adiciona animações CSS se não existirem
    if (!document.querySelector('#alert-animations')) {
        const style = document.createElement('style');
        style.id = 'alert-animations';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .close-alert {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                margin-left: 10px;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Obtém o ícone correspondente ao tipo de alerta
 * @param {string} type - Tipo de alerta
 * @returns {string} Nome do ícone FontAwesome
 */
function getAlertIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

/**
 * Mostra um loading spinner
 * @param {string} message - Mensagem a mostrar (opcional)
 * @returns {HTMLElement} Elemento do loading
 */
function showLoading(message = 'A carregar...') {
    const loading = document.createElement('div');
    loading.className = 'loading-overlay';
    loading.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            ${message ? `<p>${message}</p>` : ''}
        </div>
    `;
    
    loading.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
    `;
    
    // Adiciona estilos para o spinner
    if (!document.querySelector('#loading-styles')) {
        const style = document.createElement('style');
        style.id = 'loading-styles';
        style.textContent = `
            .spinner {
                width: 50px;
                height: 50px;
                border: 5px solid #f3f3f3;
                border-top: 5px solid #4CAF50;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 15px;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .loading-spinner {
                text-align: center;
            }
            .loading-spinner p {
                margin-top: 10px;
                color: #333;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(loading);
    return loading;
}

/**
 * Esconde o loading spinner
 */
function hideLoading() {
    const loading = document.querySelector('.loading-overlay');
    if (loading) loading.remove();
}

/**
 * Faz scroll suave para um elemento
 * @param {HTMLElement|string} element - Elemento ou seletor
 * @param {number} offset - Offset em pixels (opcional)
 */
function smoothScrollTo(element, offset = 0) {
    const target = typeof element === 'string' 
        ? document.querySelector(element) 
        : element;
    
    if (!target) return;
    
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition - offset;
    const duration = 500;
    let start = null;
    
    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// ============================================
// FORMATAÇÃO E MASCARAS
// ============================================

/**
 * Formata um número de telefone
 * @param {string} phone - Número de telefone
 * @returns {string} Telefone formatado
 */
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})$/);
    if (match) {
        return match[1] + ' ' + match[2] + ' ' + match[3];
    }
    return phone;
}

/**
 * Formata um número de cartão de crédito
 * @param {string} cardNumber - Número do cartão
 * @returns {string} Cartão formatado
 */
function formatCreditCardNumber(cardNumber) {
    const cleaned = cardNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{4})(\d{4})(\d{4})(\d{4})$/);
    if (match) {
        return match[1] + ' ' + match[2] + ' ' + match[3] + ' ' + match[4];
    }
    return cardNumber;
}

/**
 * Formata um valor monetário
 * @param {number|string} amount - Valor a formatar
 * @returns {string} Valor formatado
 */
function formatCurrency(amount) {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return num.toLocaleString('pt-PT', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// ============================================
// VALIDAÇÃO DE CARTÃO DE CRÉDITO
// ============================================

/**
 * Valida um número de cartão de crédito usando o algoritmo de Luhn
 * @param {string} cardNumber - Número do cartão
 * @returns {boolean} True se o cartão for válido
 */
function isValidCreditCard(cardNumber) {
    const cleaned = cardNumber.replace(/\D/g, '');
    
    // Verifica comprimento
    if (cleaned.length < 13 || cleaned.length > 19) return false;
    
    // Algoritmo de Luhn
    let sum = 0;
    let shouldDouble = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned.charAt(i));
        
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    
    return sum % 10 === 0;
}

/**
 * Identifica o tipo de cartão de crédito
 * @param {string} cardNumber - Número do cartão
 * @returns {string} Tipo de cartão
 */
function getCardType(cardNumber) {
    const cleaned = cardNumber.replace(/\D/g, '');
    
    const patterns = {
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$/,
        amex: /^3[47][0-9]{13}$/,
        diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        jcb: /^(?:2131|1800|35\d{3})\d{11}$/
    };
    
    for (const [type, pattern] of Object.entries(patterns)) {
        if (pattern.test(cleaned)) return type;
    }
    
    return 'unknown';
}

// ============================================
// EXPORTAÇÃO DAS FUNÇÕES
// ============================================

// Torna as funções disponíveis globalmente
window.utils = {
    // Datas
    formatDate,
    formatDateTime,
    dateDiffInDays,
    
    // Validação
    isValidEmail,
    isValidPortuguesePhone,
    isValidNIF,
    isValidPostalCode,
    validatePassword,
    isValidCreditCard,
    getCardType,
    
    // Strings
    formatPrice,
    truncateText,
    capitalizeWords,
    removeAccents,
    
    // Arrays e objetos
    removeDuplicates,
    sortByProperty,
    groupBy,
    filterArray,
    
    // Cookies e localStorage
    setCookie,
    getCookie,
    eraseCookie,
    saveToLocalStorage,
    loadFromLocalStorage,
    
    // UI e animações
    showAlert,
    showLoading,
    hideLoading,
    smoothScrollTo,
    
    // Formatação
    formatPhoneNumber,
    formatCreditCardNumber,
    formatCurrency
};

// Adiciona funções ao objeto app existente
if (window.app) {
    window.app.utils = window.utils;
}