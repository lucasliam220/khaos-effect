# Prompt para Claude — Khaos Effect

Você vai colaborar com o Codex no projeto **Khaos Effect**, um VTT multiplayer real para um RPG de mesa cômico/ácido em português do Brasil.

Leia este prompt antes de editar qualquer arquivo.

## Situação atual

O Lucas pediu para continuar o jogo. O Codex assumiu o projeto, analisou o handoff original e descobriu uma divergência importante:

- O handoff descrevia uma reconstrução Supabase já pronta.
- Nos arquivos locais, essa build Supabase não foi encontrada.
- O que foi encontrado:
  - um protótipo antigo/local com `localStorage`;
  - dados canônicos completos em `js/data.js`;
  - um HTML antigo single-file.

O Codex então criou uma nova build single-file Supabase, usando:

- o handoff como arquitetura-alvo;
- o protótipo antigo como fonte canônica de dados;
- uma implementação nova, incremental e testável.

## Arquivos principais

Na pasta do projeto, procure estes arquivos:

- `outputs/khaos_effect.html`
  - Build atual entregue.
  - HTML single-file com Supabase, lobby, criação de personagem e mesa inicial.

- `outputs/khaos_effect_build_status.md`
  - Status da build atual.
  - Leia para saber o que já foi implementado e o que falta.

- `outputs/khaos_effect_project_takeover.md`
  - Documento de posse técnica.
  - Explica os arquivos encontrados, divergências e decisões.

- `outputs/khaos_effect_handoff_review.md`
  - Revisão do handoff original com melhorias recomendadas.

- `work/khaos_effect_template.html`
  - Template-fonte editável da nova build.
  - Edite preferencialmente este arquivo, não o HTML final diretamente.

- `work/build_khaos_effect.js`
  - Gera `work/khaos_effect.html` e `outputs/khaos_effect.html`.

- `work/validate_khaos_effect.js`
  - Valida IDs obrigatórios, contagens de dados, `forestArt` e parse do JS.

- `work/khaos_effect_legacy/js/data.js`
  - Fonte canônica atual dos dados do jogo.
  - Não altere sem instrução explícita do Lucas.

## Estado da build atual

O HTML novo já inclui:

- Supabase client-side via UMD CDN.
- Identidade persistente com `player_key`.
- Criar sala real em `khaos_rooms`.
- Entrar em sala por código e senha opcional.
- Reconectar última sala.
- Lobby com jogadores em `khaos_players`.
- Heartbeat de presença por `last_seen`.
- Realtime para sala, jogadores e histórico.
- Mestre inicia sessão.
- Tela de criação/seleção de personagem.
- Persistência em `khaos_characters`.
- Vínculo do personagem em `khaos_players.character_id`.
- Mesa inicial com ficha ativa, barra de CAOS, D20, macros e histórico via `khaos_history`.

## Dados canônicos

Os dados atuais foram validados:

- 20 raças
- 13 classes
- 39 subclasses
- 292 cartas narrativas
- 18 categorias de cartas

Regra absoluta:

**Não crie, renomeie, remova ou “melhore” raças, classes, subclasses ou cartas sem pedido explícito do Lucas.**

Observação importante:

O handoff menciona a classe secreta `Fourth Wall Mason`, mas ela não aparece literalmente no `data.js` encontrado. Trate isso como pendência de reconciliação, não como autorização para inventar dado.

## Como colaborar com o Codex

Você e o Codex devem evitar editar o mesmo trecho ao mesmo tempo.

Fluxo recomendado:

1. Edite `work/khaos_effect_template.html`.
2. Rode ou peça para rodar:

```bash
node .\work\build_khaos_effect.js
node .\work\validate_khaos_effect.js
```

3. Atualize `outputs/khaos_effect_build_status.md` quando concluir uma etapa.
4. Diga claramente quais arquivos alterou.

Se for editar visual/UX, mantenha o Codex como integrador técnico final.

## Regras técnicas

- Manter aplicação single-file por enquanto.
- Usar Supabase via UMD:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

- Não usar import ESM para Supabase.
- Preservar IDs existentes usados pela lógica.
- Manter `forestArt` como `<symbol>` no HTML.
- Cada tela que usa a floresta deve ter exatamente um `<use href="#forestArt">`.
- Manter visual pixel art, sem gradientes suaves e sem estética vetorial lisa.
- Produto e textos em português do Brasil.
- Tom: irônico, ácido, com quebra de quarta parede.

## IDs importantes já validados

Preservar:

- `s-cover`
- `s-entry`
- `s-lobby`
- `s-character`
- `s-game`
- `forest-cover`
- `forest-entry`
- `forest-lobby`
- `forest-character`
- `forest-game`
- `forestArt`
- `btn-press-start`
- `inp-name`
- `tab-create`
- `tab-join`
- `form-create`
- `form-join`
- `inp-session`
- `inp-cpw`
- `btn-create`
- `inp-code`
- `inp-jpw`
- `btn-join`
- `entry-err`
- `reconnect-card`
- `reconnect-info`
- `btn-reconnect`
- `btn-forget`
- `lobby-name`
- `lobby-code`
- `lobby-code-val`
- `player-count`
- `players`
- `btn-leave`
- `btn-master-start`
- `log`
- `conn-dot`
- `conn-txt`

## Próximo trabalho recomendado

Prioridade 1:

Validar o Supabase real com autorização do Lucas, porque isso escreve registros temporários no backend remoto.

Prioridade 2:

Portar o chat da mesa usando `khaos_chat`.

Prioridade 3:

Portar mapa/tokens básicos usando `khaos_tokens`.

Prioridade 4:

Implementar thresholds de CAOS em 25/50/75/100 usando as cartas narrativas.

## Divisão sugerida

Claude:

- Refinamento visual e UX.
- Melhoria de textos e microcopy.
- Fluxo de criação de personagem.
- Ideias de gameplay, cartas, caos e experiência do Mestre.
- Revisão de clareza e consistência.

Codex:

- Integração técnica.
- Supabase.
- Validação estrutural.
- Build final.
- Smoke tests.
- Coordenação de arquivos.

## Atualização de responsabilidade

Lucas definiu que a UI é responsabilidade do Claude.

Qualquer estrutura visual criada pelo Codex deve ser tratada como preview técnico/funcional para validar fluxo, dados, Supabase e contratos. O Claude pode redesenhar a UI final, desde que preserve IDs, contratos de persistência e as validações de dados canônicos.

## Antes de terminar qualquer entrega

Garanta que:

- `node .\work\build_khaos_effect.js` passa.
- `node .\work\validate_khaos_effect.js` passa.
- As contagens canônicas continuam:
  - 20 raças
  - 13 classes
  - 39 subclasses
  - 292 cartas
- Você informou exatamente quais arquivos alterou.

Resumo: colabore com cuidado. O projeto é engraçado, mas os dados são sagrados.
