# Mister Chapéu · Site institucional (v2.3)

Proposta da **Clear Code ERL**. HTML5, CSS e JavaScript puro, sem dependências e sem build.

## Ver online
Publicado com GitHub Pages.

## Rodar localmente
Abra a pasta no VS Code e use a extensão Live Server (ou dê dois cliques em `index.html`).

## Estrutura
```
index.html     Seções: hero (foto da mesa com a garrafa), faixa, sabores (com setas e arrastar no celular), combina com, kits (Kit 01 e Kit 02, fundo preto), quem prova, para o seu negócio, CTA, rodapé
style.css      Tokens (cores do rótulo e do logo), componentes, animações, responsivo (mobile-first)
script.js      CONFIG (WhatsApp e mensagens), FLAVORS (sabores da linha) e todas as interações
assets/img/    Logo, chapéu e pimentas (recortados da arte enviada), cursor de pimenta (1x e 2x), garrafas e pote em PNG/WebP com fundo transparente, foto do hero
assets/fonts/  Anton, DM Sans e Playfair Display (auto-hospedadas, licença OFL)
```

## O que editar
- **WhatsApp e mensagens:** `CONFIG` no topo de `script.js`.
- **Sabores:** array `FLAVORS` em `script.js` (nome, nome completo, categoria, embalagem, descrição, fotos, cor do brilho). O seletor e a faixa são gerados a partir dele. Para potes ou embalagens largas use `wide: true`.
- **Cores:** variáveis em `:root` no `style.css`.

## Animações
Cursor de pimenta (só em mouse), foto do hero com zoom de entrada e parallax suave, entrada do título por linha, chapéu do logo que cai e "se levanta" ao passar o mouse no título, faixa contínua com os sabores, garrafa que sobe no balcão ao trocar de sabor, cardápio "Vai bem com" que entra item a item, pimentas flutuando na seção Combina com e na chamada final, cards dos kits com zoom no hover, mensagens com "digitando…", header que some ao descer e volta ao subir, CTA fixo. Tudo desligado com `prefers-reduced-motion`.

## Adicionar um sabor novo
Acrescente um item em `FLAVORS` (e as fotos em `assets/img/`). Seletor, contador e faixa se atualizam sozinhos; nenhum texto do site cita a quantidade de sabores.

---
Desenvolvido por **Clear Code ERL** · [@edu.rupp](https://www.instagram.com/edu.rupp/)
