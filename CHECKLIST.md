# ✅ Checklist de Acessibilidade e Privacidade - Sesiverso

## 🚀 Pré-Deploy (Obrigatório)

### ✅ Conteúdo e Placeholders
- [ ] Substituiu `{{ARTIGO_TEXT}}` pelo artigo completo
- [ ] Substituiu `{{VIDEO_URL}}` pela URL correta do YouTube
- [ ] Substituiu `{{FILMES_LIST}}` pela lista de filmes
- [ ] Substituiu `{{REPORTAGENS_LIST}}` pelas reportagens
- [ ] Substituiu `{{EQUIPE}}` pelos nomes da equipe
- [ ] Substituiu `{{ORIENTADOR}}` pelo nome do orientador
- [ ] Atualizou informações da feira (datas, local)

### ✅ Funcionalidades Críticas
- [ ] Botão de emergência CVV-188 funciona em todas as páginas
- [ ] Link `tel:188` funciona em dispositivos móveis
- [ ] Chat CVV abre corretamente (https://cvv.org.br/)
- [ ] Formulários validam campos obrigatórios
- [ ] Survey exporta CSV corretamente
- [ ] Navegação por teclado funciona

## 🔐 Privacidade e Ética

### ✅ Coleta de Dados
- [ ] Formulário de contato não coleta dados sensíveis
- [ ] Survey é completamente anônimo
- [ ] Não há campos obrigatórios para CPF, idade exata, etc.
- [ ] Aviso de privacidade está visível e claro
- [ ] Consentimento para menores está implementado

### ✅ Armazenamento
- [ ] Dados salvos apenas no localStorage (não servidor)
- [ ] Nenhum tracking de terceiros instalado
- [ ] Cookies não são utilizados para identificação
- [ ] IP não é registrado pelo site

### ✅ Transparência
- [ ] Política de privacidade está acessível
- [ ] Finalidade da coleta está explicada
- [ ] Direitos dos usuários estão informados
- [ ] Contato para dúvidas está disponível

## ♿ Acessibilidade (WCAG 2.1 AA)

### ✅ Navegação e Estrutura
- [ ] Todos os links têm texto descritivo
- [ ] Títulos seguem hierarquia (H1 > H2 > H3)
- [ ] Skip links para conteúdo principal funcionam
- [ ] Navegação por teclado está completa (Tab, Enter, Esc)
- [ ] Foco é sempre visível (outline)

### ✅ Imagens e Mídia
- [ ] Todas as imagens têm alt text descritivo
- [ ] Imagens decorativas têm alt="" ou são CSS
- [ ] Vídeo tem transcrição completa disponível
- [ ] Ícones têm aria-hidden="true" quando decorativos
- [ ] Nenhuma imagem contém texto essencial

### ✅ Formulários
- [ ] Todos os campos têm labels associados
- [ ] Mensagens de erro são claras e específicas
- [ ] Campos obrigatórios estão marcados
- [ ] Instruções são fornecidas quando necessário
- [ ] CAPTCHA tem alternativa textual

### ✅ Cores e Contraste
- [ ] Contraste mínimo 4.5:1 para texto normal
- [ ] Contraste mínimo 3:1 para texto grande
- [ ] Informações não dependem apenas de cor
- [ ] Links são distinguíveis do texto normal
- [ ] Estados de foco são visualmente claros

### ✅ Interatividade
- [ ] Botões têm aria-label quando necessário
- [ ] Modais têm aria-modal="true"
- [ ] Menus têm roles apropriados
- [ ] Estados expandido/colapsado estão indicados
- [ ] Elementos interativos têm tamanho mínimo 44px

## 📱 Responsividade

### ✅ Mobile (< 768px)
- [ ] Texto legível sem zoom horizontal
- [ ] Botões têm tamanho adequado para toque
- [ ] Menu hambúrguer funciona corretamente
- [ ] Formulários são utilizáveis
- [ ] Botão de emergência sempre visível

### ✅ Tablet (768px - 1024px)
- [ ] Layout se adapta corretamente
- [ ] Imagens não distorcem
- [ ] Navegação permanece funcional
- [ ] Conteúdo permanece legível

### ✅ Desktop (> 1024px)
- [ ] Layout utiliza espaço adequadamente
- [ ] Textos não ficam muito largos (max ~70 caracteres)
- [ ] Elementos mantêm proporções corretas

## 🔍 SEO e Performance

### ✅ Meta Tags
- [ ] Title único por página (< 60 caracteres)
- [ ] Meta description (150-160 caracteres)
- [ ] Open Graph para redes sociais
- [ ] Favicon configurado

### ✅ Estrutura
- [ ] URLs são amigáveis
- [ ] Sitemap.xml está presente
- [ ] Robots.txt configurado
- [ ] Estrutura de headings é lógica

### ✅ Performance
- [ ] Imagens otimizadas (< 500KB cada)
- [ ] CSS e JS minificados para produção
- [ ] Lazy loading em imagens não críticas
- [ ] Fontes carregam adequadamente

## 🧪 Testes de Funcionalidade

### ✅ Navegadores
- [ ] Chrome (desktop e mobile)
- [ ] Firefox (desktop)
- [ ] Safari (iOS)
- [ ] Edge (Windows)

### ✅ Dispositivos
- [ ] iPhone (várias versões do iOS)
- [ ] Android (várias versões)
- [ ] Desktop Windows
- [ ] Desktop macOS
- [ ] Tablet (horizontal e vertical)

### ✅ Assistive Technology
- [ ] Leitor de tela (NVDA, JAWS, ou VoiceOver)
- [ ] Navegação apenas por teclado
- [ ] Software de magnificação
- [ ] Reconhecimento de voz

## 🚨 Segurança

### ✅ Links Externos
- [ ] Todos têm `rel="noopener noreferrer"`
- [ ] Links de saúde mental são confiáveis
- [ ] CVV link oficial verificado
- [ ] Não há links para conteúdo inadequado

### ✅ Formulários
- [ ] Validação client-side não é única segurança
- [ ] CAPTCHA simples anti-spam implementado
- [ ] Não há campos para senhas
- [ ] Sanitização básica de inputs

### ✅ Conteúdo
- [ ] Nenhuma imagem gatilho ou gráfica
- [ ] Linguagem apropriada para todas as idades
- [ ] Métodos de autolesão não são detalhados
- [ ] Recursos de ajuda são proeminentes

## 📊 Métricas e Monitoramento

### ✅ Analytics (Se Implementado)
- [ ] Tracking anônimo apenas
- [ ] Nenhum PII coletado
- [ ] LGPD compliance
- [ ] Consentimento quando necessário

### ✅ Monitoramento
- [ ] Links de emergência funcionam
- [ ] Formulários processam corretamente
- [ ] Survey salva dados localmente
- [ ] Export CSV funciona

## 🎓 Conteúdo Educacional

### ✅ Precisão Científica
- [ ] Fontes citadas são confiáveis
- [ ] Dados estatísticos são precisos
- [ ] Metodologia está descrita
- [ ] Limitações são mencionadas

### ✅ Linguagem Adequada
- [ ] Nível apropriado para público jovem
- [ ] Termos técnicos explicados
- [ ] Linguagem inclusiva utilizada
- [ ] Tom empático e acolhedor

## 🏥 Aspectos de Saúde Mental

### ✅ Recursos de Apoio
- [ ] CVV 188 em destaque
- [ ] Múltiplas formas de buscar ajuda
- [ ] Linguagem não estigmatizante
- [ ] Esperança e recuperação enfatizadas

### ✅ Conteúdo Responsável
- [ ] Sinais de alerta explicados
- [ ] Não romantiza sofrimento mental
- [ ] Encoraja busca por ajuda profissional
- [ ] Évita linguagem dramatizada

## ✍️ Assinatura de Aprovação

### ✅ Equipe do Projeto
- [ ] **Autor**: _________________ Data: _______
- [ ] **Orientador**: _____________ Data: _______
- [ ] **Revisor Técnico**: ________ Data: _______

### ✅ Aprovação Final
- [ ] Todos os itens críticos verificados
- [ ] Testes realizados em múltiplos dispositivos
- [ ] Funcionalidades de emergência testadas
- [ ] Site pronto para publicação

---

## 🚨 ITENS CRÍTICOS (NÃO PUBLICAR SEM)

1. **CVV 188 funciona em todos os dispositivos**
2. **Nenhum dado pessoal sensível coletado**
3. **Alt text em todas as imagens**
4. **Navegação por teclado funcional**
5. **Contrastes mínimos respeitados**
6. **Formulários têm labels apropriados**
7. **Conteúdo substituído (sem placeholders {{}})**

> ⚠️ **ATENÇÃO**: Este checklist deve ser completado integralmente antes do deploy. A segurança e acessibilidade dos usuários são prioridade absoluta.