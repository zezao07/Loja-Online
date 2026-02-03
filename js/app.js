// Sistema de E-Commerce com LocalStorage

class ECommerceApp {
    constructor() {
        this.init();
    }

    init() {
        // Inicializar dados se não existirem
        this.initDatabase();
        this.updateVisitCounter();
        this.updateMenu();
        this.checkAuth();
    }

    // Inicializar base de dados local
    initDatabase() {
        // Dados de exemplo para produtos
        if (!localStorage.getItem('products')) {
            const sampleProducts = [
                {
                    id: 1,
                    nome: "Telemóvel X",
                    descricao: "Telemóvel com 128GB RAM, câmara 48MP",
                    preco: 799.99,
                    stock: 10,
                    categoria: "Eletrónica",
                    imagem: "phone.jpg"
                },
                {
                    id: 2,
                    nome: "Livro de PHP",
                    descricao: "Aprenda PHP em 30 dias - Guia completo",
                    preco: 29.99,
                    stock: 25,
                    categoria: "Livros",
                    imagem: "book.jpg"
                },
                {
                    id: 3,
                    nome: "T-Shirt Básica",
                    descricao: "T-shirt de algodão 100% preta",
                    preco: 19.99,
                    stock: 50,
                    categoria: "Vestuário",
                    imagem: "tshirt.jpg"
                },
                {
                    id: 4,
                    nome: "Headphones Wireless",
                    descricao: "Headphones com cancelamento de ruído",
                    preco: 149.99,
                    stock: 15,
                    categoria: "Eletrónica",
                    imagem: "headphones.jpg"
                },
                {
                    id: 5,
                    nome: "Relógio Smart",
                    descricao: "Relógio inteligente com GPS e monitor cardíaco",
                    preco: 299.99,
                    stock: 8,
                    categoria: "Eletrónica",
                    imagem: "smartwatch.jpg"
                },
                {
                    id: 6,
                    nome: "Mochila Notebook",
                    descricao: "Mochila impermeável para portátil até 15.6\"",
                    preco: 49.99,
                    stock: 30,
                    categoria: "Acessórios",
                    imagem: "backpack.jpg"
                }
            ];
            localStorage.setItem('products', JSON.stringify(sampleProducts));
        }

        // Dados de exemplo para utilizadores
        if (!localStorage.getItem('users')) {
            const sampleUsers = [
                {
                    id: 1,
                    username: "admin",
                    email: "admin@email.com",
                    password: this.hashPassword("admin123"),
                    tipo: "admin",
                    data_registo: new Date().toISOString()
                },
                {
                    id: 2,
                    username: "joao",
                    email: "joao@email.com",
                    password: this.hashPassword("123456"),
                    tipo: "user",
                    data_registo: new Date().toISOString()
                }
            ];
            localStorage.setItem('users', JSON.stringify(sampleUsers));
        }

        // Dados de exemplo para empregos
        if (!localStorage.getItem('jobs')) {
            const sampleJobs = [
                {
                    id: 1,
                    titulo: "Desenvolvedor Web",
                    descricao: "Procura-se developer PHP/JavaScript com experiência em e-commerce.\n\nRequisitos:\n- 3+ anos experiência\n- Conhecimento de HTML/CSS/JS\n- Experiência com React/Vue.js\n- Inglês técnico",
                    localizacao: "Lisboa",
                    salario: "30-40k/ano",
                    data_publicacao: new Date().toISOString()
                },
                {
                    id: 2,
                    titulo: "Designer UX/UI",
                    descricao: "Designer para e-commerce com foco em experiência do utilizador.\n\nRequisitos:\n- Portfólio obrigatório\n- Conhecimento de Figma/Adobe XD\n- Experiência em design responsivo\n- Boa comunicação",
                    localizacao: "Porto",
                    salario: "25-35k/ano",
                    data_publicacao: new Date().toISOString()
                }
            ];
            localStorage.setItem('jobs', JSON.stringify(sampleJobs));
        }

        // Inicializar carrinho
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify([]));
        }

        // Inicializar encomendas
        if (!localStorage.getItem('orders')) {
            localStorage.setItem('orders', JSON.stringify([]));
        }
    }

    // Hash simples de password (para demonstração)
    hashPassword(password) {
        return btoa(password); // Apenas para demonstração
    }

    // Atualizar contador de visitas
    updateVisitCounter() {
        let visits = parseInt(localStorage.getItem('visits')) || 0;
        visits++;
        localStorage.setItem('visits', visits);
        
        const visitElement = document.getElementById('visit-count');
        if (visitElement) {
            visitElement.textContent = visits;
        }
    }

    // Atualizar estatísticas
    updateStats() {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        
        const userCount = document.getElementById('user-count');
        const productCount = document.getElementById('product-count');
        
        if (userCount) userCount.textContent = users.length;
        if (productCount) productCount.textContent = products.length;
    }

    // Atualizar menu de navegação
    updateMenu() {
        const navLinks = document.getElementById('nav-links');
        if (!navLinks) return;

        const user = this.getCurrentUser();
        
        let menuHTML = `
            <li><a href="index.html"><i class="fas fa-home"></i> Início</a></li>
            <li><a href="produtos.html"><i class="fas fa-box"></i> Produtos</a></li>
            <li><a href="empregos.html"><i class="fas fa-briefcase"></i> Empregos</a></li>
        `;

        if (user) {
            menuHTML += `
                <li><a href="carrinho.html"><i class="fas fa-shopping-cart"></i> Carrinho</a></li>
                <li><a href="perfil.html"><i class="fas fa-user"></i> Perfil</a></li>
            `;
            
            if (user.tipo === 'admin') {
                menuHTML += `<li><a href="admin.html"><i class="fas fa-cog"></i> Admin</a></li>`;
            }
            
            menuHTML += `<li><a href="#" onclick="app.logout()"><i class="fas fa-sign-out-alt"></i> Sair</a></li>`;
        } else {
            menuHTML += `
                <li><a href="login.html"><i class="fas fa-sign-in-alt"></i> Login</a></li>
                <li><a href="registar.html"><i class="fas fa-user-plus"></i> Registar</a></li>
            `;
        }

        navLinks.innerHTML = menuHTML;
    }

    // Verificar autenticação
    checkAuth() {
        const protectedPages = ['admin.html', 'perfil.html', 'carrinho.html'];
        const currentPage = window.location.pathname.split('/').pop();
        
        if (protectedPages.includes(currentPage) && !this.getCurrentUser()) {
            window.location.href = 'login.html';
            return false;
        }
        
        if (currentPage === 'admin.html' && this.getCurrentUser()?.tipo !== 'admin') {
            window.location.href = 'index.html';
            return false;
        }
        
        return true;
    }

    // Obter utilizador atual
    getCurrentUser() {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    }

    // Login
    login(email, password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const hashedPassword = this.hashPassword(password);
        
        const user = users.find(u => u.email === email && u.password === hashedPassword);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.updateMenu();
            return { success: true, user };
        }
        
        return { success: false, error: 'Email ou password incorretos' };
    }

    // Logout
    logout() {
        localStorage.removeItem('currentUser');
        this.updateMenu();
        window.location.href = 'index.html';
    }

    // Registar novo utilizador
    register(username, email, password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Verificar se email já existe
        if (users.find(u => u.email === email)) {
            return { success: false, error: 'Este email já está registado' };
        }
        
        const newUser = {
            id: users.length + 1,
            username,
            email,
            password: this.hashPassword(password),
            tipo: 'user',
            data_registo: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        return { success: true, user: newUser };
    }

    // Obter produtos
    getProducts(search = '', category = '') {
        let products = JSON.parse(localStorage.getItem('products') || '[]');
        
        if (search) {
            products = products.filter(p => 
                p.nome.toLowerCase().includes(search.toLowerCase()) ||
                p.descricao.toLowerCase().includes(search.toLowerCase())
            );
        }
        
        if (category) {
            products = products.filter(p => p.categoria === category);
        }
        
        return products;
    }

    // Adicionar ao carrinho
    addToCart(productId, quantity = 1) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const product = this.getProducts().find(p => p.id === productId);
        
        if (!product) return false;
        
        const cartItem = cart.find(item => item.productId === productId);
        
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.push({
                productId,
                quantity,
                addedAt: new Date().toISOString()
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        return true;
    }

    // Obter carrinho com detalhes
    getCart() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const products = this.getProducts();
        
        return cart.map(item => {
            const product = products.find(p => p.id === item.productId);
            return {
                ...item,
                product: product || null,
                subtotal: product ? product.preco * item.quantity : 0
            };
        }).filter(item => item.product !== null);
    }

    // Remover do carrinho
    removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart = cart.filter(item => item.productId !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Finalizar compra
    checkout() {
        const cart = this.getCart();
        const user = this.getCurrentUser();
        
        if (!user || cart.length === 0) {
            return { success: false, error: 'Carrinho vazio ou não autenticado' };
        }
        
        const total = cart.reduce((sum, item) => sum + item.subtotal, 0);
        
        const order = {
            id: Date.now(),
            userId: user.id,
            items: cart,
            total: total + 5, // +5€ portes
            status: 'pendente',
            date: new Date().toISOString()
        };
        
        let orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Atualizar stock
        cart.forEach(item => {
            this.updateProductStock(item.productId, -item.quantity);
        });
        
        // Limpar carrinho
        localStorage.setItem('cart', JSON.stringify([]));
        
        return { success: true, order };
    }

    // Atualizar stock do produto
    updateProductStock(productId, quantity) {
        let products = JSON.parse(localStorage.getItem('products') || '[]');
        const index = products.findIndex(p => p.id === productId);
        
        if (index !== -1) {
            products[index].stock += quantity;
            if (products[index].stock < 0) products[index].stock = 0;
            localStorage.setItem('products', JSON.stringify(products));
        }
    }

    // Obter encomendas do utilizador
    getUserOrders() {
        const user = this.getCurrentUser();
        if (!user) return [];
        
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        return orders.filter(order => order.userId === user.id);
    }

    // Obter todos os utilizadores (admin)
    getAllUsers() {
        return JSON.parse(localStorage.getItem('users') || '[]');
    }

    // Adicionar produto (admin)
    addProduct(product) {
        const products = JSON.parse(localStorage.getItem('products') || '[]');
        const newProduct = {
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
            ...product
        };
        
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        return newProduct;
    }

    // Eliminar produto (admin)
    deleteProduct(productId) {
        let products = JSON.parse(localStorage.getItem('products') || '[]');
        products = products.filter(p => p.id !== productId);
        localStorage.setItem('products', JSON.stringify(products));
    }
}

// Instanciar a aplicação globalmente
window.app = new ECommerceApp();