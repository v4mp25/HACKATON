# Martel Backend Log

## Fecha/hora
2026-06-26

## Que hice
- Configuré reglas de seguridad Firestore para colecciones users, crops y alerts.
- Definí índice compuesto para crops (userId ASC, createdAt DESC).
- Creé datos semilla (seedData.ts) con usuario demo y 3 cultivos demo.
- La función `seedFirestore()` está preparada para que Jhunior la conecte.
- Documenté acuerdos del equipo en `00-acuerdos.md`.
- Documenté flujo Git en `01-git-flujo.md`.

## Archivos tocados
- firebase/firestore.rules
- firebase/firestore.indexes.json
- src/services/seedData.ts
- docs/obsidian/00-acuerdos.md
- docs/obsidian/01-git-flujo.md

## Solucion aplicada
- Reglas Firestore protegen datos por usuario autenticado.
- seedData.ts usa `writeBatch` para atomicidad.
- `seedFirestore()` verifica que el usuario esté autenticado antes de escribir.

## Pendiente
- Firebase Console ya está configurado con proyecto agroalerta-pwa.
- Authentication con Email/Password ya activado.
- Firestore creado en modo producción.
- Reglas copiadas desde firestore.rules a Firebase Console.
- .env.local con credenciales listo.
