# Sesiverso - Site da Feira de Ciências

Site completo para o projeto "O Impacto dos Influenciadores na Saúde Mental dos Jovens" da feira de ciências Sesiverso.

## 📋 Visão Geral

Este é um site estático responsivo focado em apresentar pesquisa científica sobre saúde mental digital de forma acessível, segura e educativa. O projeto inclui recursos de emergência (CVV 188), formulários de pesquisa anônimos e materiais educacionais completos.

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Design responsivo e moderno
- **JavaScript**: Interatividade e funcionalidades avançadas
- **FontAwesome**: Ícones consistentes
- **Google Fonts**: Tipografia profissional (Inter + Poppins)

## 📁 Estrutura do Projeto

```
sesiverso/
├── index.html              # Página principal
├── artigo.html              # Artigo científico completo
├── video.html               # Vídeo e transcrição
├── filmes.html              # Lista de filmes e documentários
├── reportagens.html         # Reportagens e estudos
├── intervencoes.html        # Propostas de intervenção + survey
├── como-ajudar.html         # Recursos de saúde mental
├── galeria.html             # Imagens e infográficos
├── contato.html             # Formulário de contato
├── css/
│   └── style.css            # Estilos principais
├── js/
│   ├── scripts.js           # JavaScript principal
│   └── video.js             # Funcionalidades do vídeo
├── assets/
│   ├── images/              # Imagens do projeto
│   └── posters/             # Posters A3 para impressão
├── robots.txt               # SEO
├── sitemap.xml              # SEO
└── survey_template.csv      # Template para respostas do survey
```

## 🔄 Como Substituir Conteúdo Dinâmico

### 1. Texto do Artigo (`{{ARTIGO_TEXT}}`)

**Arquivo**: `artigo.html`
**Local**: Dentro da div com classe `article-text`
**Como fazer**:
1. Abra `artigo.html`
2. Localize o comentário `{{ARTIGO_TEXT}}`
3. Substitua todo o placeholder pelo texto completo do artigo
4. Mantenha as tags HTML para seções (`<section id="introducao">`, etc.)

### 2. URL do Vídeo (`{{VIDEO_URL}}`)

**Arquivo**: `video.html`
**Local**: Dentro da div `video-embed`
**Como fazer**:
1. Abra `video.html`
2. Localize `{{VIDEO_URL}}`
3. Substitua pela URL do YouTube no formato embed:
   ```html
   <iframe 
       src="https://www.youtube.com/embed/SEU_VIDEO_ID" 
       title="O Impacto dos Influenciadores na Saúde Mental dos Jovens"
       frameborder="0" 
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
       allowfullscreen>
   </iframe>
   ```

### 3. Lista de Filmes (`{{FILMES_LIST}}`)

**Arquivo**: `filmes.html`
**Local**: Dentro da div `movies-grid`
**Como fazer**:
1. Abra `filmes.html`
2. Localize o placeholder `{{FILMES_LIST}}`
3. Substitua pelos seus filmes usando esta estrutura:

```html
<article class="movie-card" data-category="categoria">
    <div class="movie-poster">
        <img src="URL_DA_IMAGEM" alt="Descrição acessível" loading="lazy">
        <div class="movie-overlay">
            <div class="movie-rating">★★★★☆</div>
            <div class="movie-category">Gênero</div>
        </div>
    </div>
    <div class="movie-info">
        <h3 class="movie-title">Nome do Filme</h3>
        <div class="movie-meta">
            <span class="movie-year">Ano</span>
            <span class="movie-duration">Duração</span>
            <span class="movie-age">Classificação</span>
        </div>
        <p class="movie-synopsis">Sinopse do filme...</p>
        <div class="movie-themes">
            <span class="theme-tag">Tema 1</span>
            <span class="theme-tag">Tema 2</span>
        </div>
        <div class="movie-actions">
            <a href="LINK_STREAMING" class="btn btn-primary">Ver Online</a>
        </div>
    </div>
</article>
```

### 4. Lista de Reportagens (`{{REPORTAGENS_LIST}}`)

**Arquivo**: `reportagens.html`
**Local**: Dentro da div `articles-grid`
**Estrutura**:

```html
<article class="article-card" data-type="tipo" data-year="ano">
    <div class="article-header">
        <div class="article-type">Tipo</div>
        <div class="article-date">Data</div>
    </div>
    <div class="article-content">
        <h3 class="article-title">Título da Reportagem</h3>
        <div class="article-meta">
            <span class="article-source">Veículo</span>
            <span class="article-authors">Autor</span>
        </div>
        <p class="article-summary">Resumo...</p>
        <div class="article-topics">
            <span class="topic-tag">Tag</span>
        </div>
        <div class="article-actions">
            <a href="LINK" class="btn btn-primary">Ler Artigo</a>
        </div>
    </div>
</article>
```

### 5. Informações da Equipe (`{{EQUIPE}}`)

**Arquivo**: `index.html`
**Local**: Seção team, div `team-list`
**Como fazer**:
1. Substitua os placeholders pelos nomes reais
2. Adicione mais membros copiando a estrutura

## 🚀 Como Fazer Deploy no GitHub Pages

### 1. Preparar o Repositório
```bash
# Clonar ou criar repositório
git clone https://github.com/SEU_USUARIO/sesiverso.git
cd sesiverso

# Adicionar arquivos
git add .
git commit -m "Adicionar site Sesiverso"
git push origin main
```

### 2. Ativar GitHub Pages
1. Vá para **Settings** > **Pages** no seu repositório
2. Em **Source**, selecione **Deploy from a branch**
3. Escolha **Branch: main** e **Folder: / (root)**
4. Clique em **Save**

### 3. Configurar Domínio (Opcional)
1. Adicione arquivo `CNAME` na raiz com seu domínio
2. Configure DNS do seu domínio apontando para GitHub

### 4. URL Final
Seu site estará em: `https://SEU_USUARIO.github.io/sesiverso`

## 📊 Como Exportar Respostas do Survey para CSV

### 1. Através da Interface
1. Acesse `intervencoes.html`
2. Role até o final da página
3. Clique em **"Exportar Respostas (CSV)"**
4. O arquivo será baixado automaticamente

### 2. Programaticamente (JavaScript)
```javascript
// Acessar dados salvos
const responses = JSON.parse(localStorage.getItem('surveyResponses') || '[]');

// Exportar para CSV
window.SurveyManager.exportToCSV();
```

### 3. Estrutura do CSV Gerado
- **Timestamp**: Data e hora da resposta
- **period**: Pré/pós/follow-up
- **age_group**: Faixa etária
- **intervention_type**: Tipo de intervenção
- **wellbeing_general**: Bem-estar geral (1-5)
- **sleep_quality**: Qualidade do sono (1-5)
- **anxiety_level**: Nível de ansiedade (1-5)
- **time_awareness**: Consciência do tempo de uso (1-5)
- **social_comparison**: Comparação social (1-5)
- **perfection_pressure**: Pressão por perfeição (1-5)
- **self_control**: Autocontrole (1-5)
- **daily_screen_time**: Tempo diário de tela
- **primary_platform**: Plataforma principal
- **withdrawal_symptoms**: Sintomas de abstinência (1-5)

## 🎨 Personalização Visual

### Cores
```css
:root {
    --primary-blue: #0B3D91;      /* Azul principal */
    --secondary-turquoise: #39A0A6; /* Turquesa para CTAs */
    --light-gray: #F6F7F9;        /* Fundo claro */
    --text-dark: #222222;         /* Texto principal */
    --emergency: #DC2626;         /* Botão de emergência */
}
```

### Tipografia
- **Títulos**: Poppins (600, 700)
- **Corpo**: Inter (400, 500, 600)
- **Line-height**: 150% para corpo, 120% para títulos

### Responsividade
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔒 Privacidade e Segurança

### Dados Coletados
- ✅ **Survey anônimo**: Apenas respostas em escala Likert
- ✅ **Formulário de contato**: Nome/email opcionais
- ❌ **NÃO coletamos**: CPF, idade exata, dados sensíveis

### Proteções Implementadas
- CAPTCHA simples anti-spam
- Validação de consentimento para menores
- Aviso de privacidade obrigatório
- Armazenamento local apenas (localStorage)

### Conformidade
- ✅ LGPD friendly
- ✅ Ética em pesquisa com menores
- ✅ Consentimento informado
- ✅ Anonimato garantido

## 📞 Recursos de Emergência

### Botão CVV Fixo
- Sempre visível em todas as páginas
- Link direto para `tel:188`
- Chat online do CVV
- Cores de destaque (vermelho)

### Página de Ajuda
- Contatos de emergência
- Passo a passo para buscar ajuda
- Recursos escolares (UBS, CAPS)
- Orientações para familiares

## ✅ Checklist de Acessibilidade

- ✅ **ARIA labels** em todos os elementos interativos
- ✅ **Alt text** descritivo em todas as imagens
- ✅ **Contraste mínimo** AA (4.5:1) em todos os textos
- ✅ **Navegação por teclado** funcional
- ✅ **Foco visível** em todos os elementos
- ✅ **Títulos hierárquicos** (H1, H2, H3...)
- ✅ **Labels em formulários** associados corretamente
- ✅ **Transcrição de vídeo** completa disponível
- ✅ **Skip links** para conteúdo principal
- ✅ **Suporte a leitores de tela**

## 🎯 SEO Implementado

### Meta Tags
- Title único por página (< 60 caracteres)
- Description específica (150-160 caracteres)
- Open Graph para redes sociais
- Canonical URLs

### Estrutura
- URLs semânticas
- Sitemap.xml incluído
- Robots.txt configurado
- Schema markup para artigos

## 🐛 Solução de Problemas Comuns

### Video não carrega
1. Verifique se substituiu `{{VIDEO_URL}}`
2. Use formato embed: `/embed/VIDEO_ID`
3. Verifique se vídeo é público

### Survey não exporta
1. Verifique se há respostas salvas
2. Teste em navegador moderno (Chrome/Firefox)
3. Permita downloads automáticos

### Formulário não envia
1. Responda CAPTCHA corretamente (2+3=5)
2. Marque consentimento de privacidade
3. Preencha campos obrigatórios

### Botão emergência não funciona
1. Verifique se `scripts.js` carregou
2. Teste `tel:188` no celular
3. Verifique conexão com internet para chat

## 📱 Testes Recomendados

### Dispositivos
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Desktop (Chrome, Firefox, Edge)
- [ ] Tablet (responsividade)

### Funcionalidades
- [ ] Navegação por teclado (Tab)
- [ ] Botão de emergência
- [ ] Formulários (validação)
- [ ] Survey completo
- [ ] Export CSV
- [ ] Vídeo incorporado

### Acessibilidade
- [ ] Leitor de tela (NVDA/JAWS)
- [ ] Alto contraste
- [ ] Zoom 200%
- [ ] Apenas teclado

## 🆘 Suporte

### Para Dúvidas Técnicas
- Consulte comentários no código
- Verifique console do navegador (F12)
- Teste em diferentes navegadores

### Para Conteúdo
- Use os placeholders marcados com `{{}}`
- Mantenha estrutura HTML existente
- Teste após cada alteração

### Para Problemas de Deploy
- Verifique se todos os arquivos estão no repositório
- Confirme configurações do GitHub Pages
- Aguarde até 10 minutos para propagação

---

**Criado por**: Equipe Sesiverso  
**Licença**: Creative Commons BY-NC-SA 4.0  
**Contato**: [formulário no site]  

> ⚠️ **Importante**: Este projeto contém recursos de saúde mental. Sempre teste o botão de emergência CVV-188 antes de publicar.