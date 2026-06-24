# Khaos Effect — Build atual

Arquivo entregue:

- `outputs/khaos_effect.html`

Preview visual:

- `outputs/khaos_effect_cover.png`

## Implementado nesta etapa

- Novo HTML single-file de trabalho.
- Dados canonicos embutidos a partir do prototipo antigo:
  - 20 racas
  - 13 classes
  - 39 subclasses
  - 292 cartas em 18 categorias
- Fundacao Supabase client-side via UMD CDN.
- Identidade persistente com `player_key`.
- Criar sala real em `khaos_rooms`.
- Entrar em sala por codigo e senha opcional.
- Reconectar ultima sala salva.
- Lobby com jogadores em `khaos_players`.
- Heartbeat de presenca por `last_seen`.
- Realtime para sala, jogadores e historico.
- Mestre inicia sessao.
- Tela de criacao/selecionar personagem.
- Persistencia em `khaos_characters`.
- Vinculo do personagem em `khaos_players.character_id`.
- Contrato inicial de `characters.data` com `schemaVersion`, `macros`, `stats`, `skills`, `inventory` e `notes`.
- Mesa inicial com ficha ativa, barra de CAOS, D20, macros e historico via `khaos_history`.

## Atualizacao — title screen animada

- Assets fornecidos movidos para `assets/title-screen/`.
- `reference-final.png` mantido somente como referencia visual; nao e usado como tela cheia.
- `background.mp4` usado como fundo principal em loop da capa.
- `background.png` mantido como poster/fallback estatico.
- `khaos-effect-logo.png` usado como logo independente acima da cena.
- Criados `assets/title-screen/animations.json` e `assets/title-screen/scene-layout.json`.
- Capa `s-cover` reconstruida como cena em camadas:
  - video em loop com comportamento `cover`;
  - canvas de efeitos procedurais desativado quando o MP4 esta ativo;
  - logo independente com flutuacao e pulso no cristal;
  - `PRESS START` funcional como elemento de UI.
- Implementado controlador `TitleScene` com:
  - particulas prealocadas;
  - portal roxo;
  - feixe azul;
  - fogo, fumaca e brasas;
  - ataques ocasionais dos dragoes;
  - agua e cachoeiras;
  - slimes/ogro com overlays ancorados ao background;
  - meteoro ocasional;
  - suporte a Enter, espaco, clique, toque e gamepad;
  - fade-out unico para a tela de login `s-auth`;
  - reducao de movimento via `prefers-reduced-motion`.
- Fallback tecnico: como o `background.png` ja contem a maioria das criaturas, os corpos completos ainda nao foram recortados para sprite sheets reais. Os movimentos principais usam efeitos e overlays ancorados ate haver cutouts limpos.
- Tela de criacao/entrada de sala `s-entry` ajustada para usar o mesmo `background.mp4` em loop.

## Atualizacao — login, cadastro e fundos em video

- Adicionadas telas `s-auth` e `s-register`, abertas a partir do `PRESS START` com animacao de janela descendo de cima.
- Login exige conta local cadastrada; conta inexistente recomenda cadastro e nao libera o menu de sala.
- Cadastro inclui nome do usuario, e-mail, senha e confirmacao de senha.
- Cadastro concluido autentica o jogador no preview e direciona para o menu de sala.
- Menu de sala `s-entry` reduzido para uma janela com duas abas:
  - `Criar sala`: nome da sala e senha opcional, mantendo geracao de codigo `KHAOS-XXXX`;
  - `Entrar`: selecao de salas criadas pelo usuario e entrada manual por codigo.
- Todas as telas depois da capa usam video em loop:
  - `background.mp4` em login, cadastro, sala, lobby e mesa;
  - `background-character.mp4` na tela de criacao/selecao de personagem.
- Validador atualizado para exigir os IDs de auth/cadastro, selecao de sala criada e o novo asset de video da tela de personagem.

## Atualizacao — pagina de personagens

- Tela `s-character` reestruturada em area de etapas, biblioteca, criacao, dossie e resumo.
- Adicionados indicadores de progresso: Nome, Raca, Classe e Subclasse.
- Adicionado painel de metadados com total de personagens, total de dados carregados e macros previstas.
- Selecao de Raca/Classe/Subclasse reorganizada com grid responsivo.
- Adicionado dossie com detalhes da raca, classe e subclasse selecionadas.
- Corrigido fallback para `player_key` quando `crypto.randomUUID()` nao existe em `file://`.
- Renomeado mapa local de raridade para evitar colisao runtime com constantes do `data.js`.
- Validador reforcado para parsear dados canonicos e script da app juntos, capturando colisoes de identificadores.

## Atualizacao — menu de selecao de personagem

- Tela `s-character` redesenhada no estilo RPG 16-bit da referencia enviada pelo Lucas, adaptada ao tom de Khaos Effect.
- Adicionado fundo em pixel art com HUD superior, contadores canonicos e menu lateral.
- Painel central `Selecionar Personagem` agora organiza:
  - biblioteca de fichas salvas;
  - nome do personagem;
  - abas horizontais de classe;
  - selecao de raca e subclasse;
  - retrato em pixel art procedural;
  - barras de atributo derivadas das escolhas;
  - habilidades/macros previstas;
  - personalizacao/resumo da ficha.
- O fluxo funcional original foi preservado: IDs, selecao de raca/classe/subclasse, especial, salvamento e vinculo do personagem continuam os mesmos.

## Atualizacao — ficha com sistema e especial

- Biblioteca de personagens salvos agora destaca fichas com personagem especial.
- Fluxo de criacao ganhou etapa opcional `Especial`.
- Adicionado painel `Personagem especial` com `Fourth Wall Mason` como overlay especial, sem alterar a lista canonica de 13 classes.
- O especial agora possui dois estados separados:
  - `characters.data.specialUnlock`: permissao concedida pelo Mestre;
  - `characters.data.specialCharacter`: especial ativado pelo jogador na ficha.
- O Mestre pode liberar ou revogar o especial pela lista de jogadores quando a ficha ja existe.
- O jogador so consegue ativar e salvar o especial se o Mestre tiver liberado a ficha.
- O KHAOS pessoal passa a somar raca + classe + subclasse + especial apenas quando o especial esta ativo.
- A ficha da mesa agora exibe:
  - estrutura escolhida: raca, classe e subclasse;
  - medidor de KHAOS pessoal;
  - habilidades de raca;
  - habilidades de classe/subclasse;
  - bloco do personagem especial;
  - macros derivadas da classe, subclasse e especial.

## Validado localmente

- Build gerado com dados canonicos intactos.
- Sintaxe do script principal validada.
- IDs obrigatorios preservados.
- `<symbol id="forestArt">` aparece 1x.
- `<use href="#forestArt">` aparece 5x, uma vez por tela.
- Captura headless da capa gerada com Edge.
- Smoke test headless do fluxo capa -> login -> bloqueio sem conta -> cadastro -> menu de sala executado com Edge.
- Conferido que todas as telas apos a capa possuem `.loop-video-bg` e que `s-character` usa `background-character.mp4`.

## Nao validado ainda

- Smoke test no Supabase real nao foi executado porque escreveria dados temporarios no backend remoto. Para rodar, Lucas precisa autorizar explicitamente esse efeito externo.

## Proximo incremento recomendado

1. Rodar smoke test real autorizado no Supabase.
2. Ajustar qualquer diferenca de schema que aparecer.
3. Portar o chat da mesa.
4. Portar tokens/mapa basico.
5. Implementar thresholds de CAOS em 25/50/75/100 usando as cartas narrativas.
