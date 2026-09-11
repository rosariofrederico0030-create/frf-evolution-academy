# FORTALEZA ROSÁRIO FREDERICO EVOLUTION ACADEMY — V4 PWA

## Identidade do projeto
- Nome: Fortaleza Rosário Frederico Evolution Academy
- Fundador / proprietário indicado no produto: Rosário José Chimbulo Frederico
- Função no sistema: Fundador · Proprietário do projeto · Administrador
- Foco inicial: Inglês e Francês
- Estrutura pedagógica: Pre-A1/A1 → A2 → B1 → B2 → C1 → C2
- Público: estudantes e aprendentes de línguas
- Base pedagógica: alinhamento ao CEFR/CEFR Companion Volume, adaptado ao contexto da academia.

## O que esta versão entrega
- Interface mobile-first
- Área de estudante
- Registo e perfil local de demonstração
- Cursos e níveis
- Diagnóstico de demonstração
- Aula interativa
- Pontos e progresso
- Área administrativa local
- Manifesto PWA
- Service worker para cache/offline básico
- Base pronta para publicação como PWA

## Importante
Esta versão ainda usa armazenamento local no dispositivo (localStorage). Portanto:
- os alunos não partilham uma base de dados online;
- o administrador não controla remotamente os dados de todos os alunos;
- não existe ainda autenticação real, base de dados na nuvem, pagamentos ou certificados verificáveis;
- a identificação dentro do software não constitui, por si só, prova de propriedade legal da empresa.

## Para transformar em plataforma mundial
1. Comprar/registar um domínio da academia.
2. Publicar esta pasta num serviço de hospedagem HTTPS.
3. Criar backend + base de dados.
4. Implementar autenticação segura e recuperação de palavra-passe.
5. Criar papéis: proprietário, administrador, professor, estudante.
6. Migrar os dados do localStorage para a base de dados.
7. Implementar cursos, avaliações, progresso, certificados e relatórios.
8. Adicionar conteúdos licenciados/originais: texto, áudio, vídeo e exercícios.
9. Implementar privacidade, termos de uso, proteção de dados e regras para estudantes menores.
10. Adicionar domínio de e-mail, notificações e integração com canais de atendimento.
11. Testar em Android/iOS/desktop e fazer lançamento gradual.
12. Só depois avaliar empacotamento para lojas de aplicações.

## Instalação no telefone
A aplicação pode ser instalada como PWA quando estiver publicada num domínio HTTPS compatível. No Android/Chrome, o utilizador poderá usar a opção de instalar/adicionar à tela inicial, conforme o suporte do navegador.

## Parâmetros essenciais do proprietário
Não coloque no código público:
- palavra-passe;
- PIN;
- número de documento de identidade;
- dados bancários;
- chaves secretas/API keys.

Esses dados devem ficar num sistema seguro de gestão de segredos e no painel administrativo.

## Próximo salto
A V4 é uma base técnica mais preparada para publicação. O verdadeiro produto mundial deve ser uma plataforma online com backend, autenticação, base de dados, painel do proprietário e domínio próprio.
