// Carregar produtos em destaque
function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    const products = app.getProducts().slice(0, 3); // Primeiros 3 produtos
    
    if (products.length === 0) {
        container.innerHTML = '<div class="no-products"><p>Nenhum produto disponível no momento.</p></div>';
        return;
    }

    container.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="images/${product.imagem || 'default.jpg'}" 
                     alt="${product.nome}" 
                     onerror="this.src='images/default.jpg'">
            </div>
            <h3>${product.nome}</h3>
            <p class="product-description">
                ${product.descricao.substring(0, 80)}...
            </p>
            <p class="price">€${product.preco.toFixed(2)}</p>
            
            <div class="product-actions">
                <a href="produto-detalhe.html?id=${product.id}" 
                   class="btn btn-small">Ver Detalhes</a>
                
                ${app.getCurrentUser() ? `
                <button onclick="app.addToCart(${product.id})" 
                        class="btn btn-small btn-cart">
                    <i class="fas fa-cart-plus"></i> Add
                </button>
                ` : `
                <a href="login.html" class="btn btn-small">
                    <i class="fas fa-shopping-cart"></i> Comprar
                </a>
                `}
            </div>
        </div>
    `).join('');
}

// Inicializar página
document.addEventListener('DOMContentLoaded', function() {
    // Atualizar estatísticas
    app.updateStats();
    
    // Carregar produtos em destaque
    loadFeaturedProducts();
    
    // Inicializar consentimento de cookies
    initCookies();
});

// Sistema de cookies
function initCookies() {
    if (!localStorage.getItem('cookiesAccepted')) {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
            <p>Este site utiliza cookies para melhorar a experiência. 
            <button onclick="acceptCookies()">Aceitar</button>
            <button onclick="declineCookies()">Recusar</button></p>
        `;
        banner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #333;
            color: white;
            padding: 15px;
            text-align: center;
            z-index: 1000;
        `;
        document.body.appendChild(banner);
    }
}

function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookie-banner')?.remove();
}

function declineCookies() {
    localStorage.setItem('cookiesAccepted', 'false');
    document.getElementById('cookie-banner')?.remove();
}