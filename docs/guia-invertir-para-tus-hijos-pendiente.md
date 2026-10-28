# Guía "Cómo invertir para tus hijos": pendiente de validación

Documento interno. No se publica en la web.

Página: `/kiri-academy/como-invertir-para-tus-hijos`
Contenido editable: `lib/guides/invest-for-kids.ts`

## Datos de Indexa Capital

Fuente única: `lib/indexa.ts`. Ahí están los mínimos, las comisiones, la documentación, el proceso a los 18 años, los enlaces y la fecha de consulta (`INDEXA_CONSULTED`). Al revisar las cifras en Indexa, actualiza ese archivo y la fecha. Las tres guías y la home lo leen.

- [x] Proveedor: Indexa Capital.
- [x] Comisiones: tramo de gestión del 0,520 % al 0,080 % y medias de gestión, custodia y fondos, comprobados en las fuentes de Indexa.
- [x] Mínimos: 1.000 € de inversión inicial, o 500 € si el representante ya es cliente, comprobados en las fuentes de Indexa.
- [x] Documentación para abrir la cuenta del menor (según Indexa).
- [x] Proceso cuando el menor cumple 18 años (según Indexa).

## Kiri debe confirmar antes de difundir

- [ ] Que el texto de la nota fiscal es el que Kiri quiere publicar.
- [ ] Condiciones actuales de Regala Kiri.
- [ ] Que el bloque "Kiri ayuda a las familias..." (metas de ahorro, contribuciones de familiares y educación financiera) describe el producto actual.
- [ ] Autoría: hoy firma "Equipo de Kiri Academy". Decidir si firma una persona y quién revisa (cargo y cualificación).
- [ ] Revisión legal o de compliance del texto (comunicaciones comerciales CNMV, titularidad y fiscalidad).

## Guía "Regalos financieros para niños"

Página: `/kiri-academy/regalos-financieros-para-ninos`
Contenido editable: `lib/guides/gift-ideas.ts` (incluye `productFacts`)

- [ ] Qué pasa con la cuenta después del pedido de Regala Kiri (paso 3 de "Cómo funciona Regala Kiri").
- [ ] Si se pueden hacer aportaciones periódicas (FAQ "¿Puedo aportar todos los meses?").
- [x] Proveedor, comisiones, documentación y proceso a los 18 años en `productFacts` (desde `lib/indexa.ts`).
- [ ] Precio del regalo y contenido del Welcome Pack (`productFacts.setupPrice` y `welcomePack`, en `null`).

## Artículo "Cómo funciona una cartera de fondos indexados para un menor"

Página: `/kiri-academy/fondos-de-inversion-indexados`
Contenido editable: `lib/guides/index-funds.ts`

- [ ] Confirmar que se mantiene la cifra del 11,56 % y su nota de fuente (Kiri, a 31 de mayo de 2026). Si cambia, actualízala también en la home.
- [ ] Autoría y revisión, igual que en las otras guías.
- [ ] Revisión legal o de compliance del texto.
- [ ] Autoría y revisión, igual que en la guía de inversión.
- [ ] Revisión legal o de compliance del texto.

## Página de gracias de Regala Kiri

Página: `/regala-kiri/gracias` (con `noindex`, fuera del sitemap)
Contenido editable: `app/regala-kiri/gracias/page.tsx`

- [ ] En Square, poner `https://www.kiriapp.com/regala-kiri/gracias` como URL de redirección tras el pago del enlace "Kiri Regalo". Lo tiene que hacer quien tenga acceso a Square.
- [ ] Confirmar el texto de "Qué pasa ahora", sobre todo el tercer paso (qué hace Kiri y cuándo se contacta con el padre, la madre o el tutor legal).
- [ ] Confirmar si Square envía recibo por correo cuando el pedido es de 0 € con un código de descuento. Si no lo envía, ajustar el segundo paso.

## Al actualizar la guía

Cambiar `reviewed` en `lib/guides/invest-for-kids.ts`. Esa fecha alimenta la página, el JSON-LD y el sitemap.
