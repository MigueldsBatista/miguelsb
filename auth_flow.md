Estratégia de Autenticação e Rastreamento

Para um portfólio de alto nível, a fricção de um login afasta recrutadores. Precisamos de uma solução invisível para o visitante e robusta para o administrador.

1. Identificação do Visitante (Sem Login)

Utilizaremos o conceito de Anonymous Auth ou Persistent Client ID.

Como funciona:

No primeiro acesso, o Frontend verifica se existe um visitor_id no localStorage.

Caso não exista, o sistema gera um UUID v4 único.

Este ID é enviado em cada interação (clique no botão, visualização de projeto).

Armazenamento de Interações (Firestore):

Conforme as regras de persistência, utilizaremos o Firestore para registrar estas interações.

Caminho Público: /artifacts/{appId}/public/data/interactions

Documento: O ID do documento será o visitor_id.

Campos: click_count, last_visit, geo_location (opcional via IP), user_agent.

2. Autenticação Administrativa (Seu Acesso)

Para gerenciar projetos e certificados, você precisa de uma autenticação real.

Implementação:

JWT (JSON Web Token): O Django cuidará da emissão de tokens para o seu usuário.

Painel Admin: Protegido por uma rota no Nuxt que verifica a validade do token.

Segurança: Apenas requisições com o cabeçalho Authorization: Bearer <token> podem alterar dados de projetos ou certificados.

3. Fluxo de Dados de Gamificação

Visitante clica no botão:

O Frontend envia o visitor_id para o Firebase/Firestore.

O Firestore incrementa o contador global e o contador individual do visitante.

Registro de Logs:

O Backend (Django) pode rodar um worker periódico para extrair estatísticas do Firestore e gerar relatórios de "Empresas que mais visitaram" com base no range de IP.

4. Vantagens Técnicas

Zero Fricção: O recrutador interage e você sabe que ele voltou, sem pedir senha.

Prevenção de Spam: Você pode limitar cliques por visitor_id no lado do servidor/regras de segurança.

Maturidade: Demonstra conhecimento em arquitetura de dados e privacidade (GDPR/LGPD).

Próximo Passo sugerido:

Implementar o serviço de identificação no Nuxt 4 para gerar e persistir este ID, e configurar as regras básicas do Firestore para aceitar incrementos anônimos.