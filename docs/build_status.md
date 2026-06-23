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

## Atualizacao — pagina de personagens

- Tela `s-character` reestruturada em area de etapas, biblioteca, criacao, dossie e resumo.
- Adicionados indicadores de progresso: Nome, Raca, Classe e Subclasse.
- Adicionado painel de metadados com total de personagens, total de dados carregados e macros previstas.
- Selecao de Raca/Classe/Subclasse reorganizada com grid responsivo.
- Adicionado dossie com detalhes da raca, classe e subclasse selecionadas.
- Corrigido fallback para `player_key` quando `crypto.randomUUID()` nao existe em `file://`.
- Renomeado mapa local de raridade para evitar colisao runtime com constantes do `data.js`.
- Validador reforcado para parsear dados canonicos e script da app juntos, capturando colisoes de identificadores.

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

## Nao validado ainda

- Smoke test no Supabase real nao foi executado porque escreveria dados temporarios no backend remoto. Para rodar, Lucas precisa autorizar explicitamente esse efeito externo.

## Proximo incremento recomendado

1. Rodar smoke test real autorizado no Supabase.
2. Ajustar qualquer diferenca de schema que aparecer.
3. Portar o chat da mesa.
4. Portar tokens/mapa basico.
5. Implementar thresholds de CAOS em 25/50/75/100 usando as cartas narrativas.
