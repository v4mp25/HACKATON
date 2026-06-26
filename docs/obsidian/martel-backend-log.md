# Martel Backend Log

## Fecha/hora
2026-06-26

## Que hice
- Configuré reglas de seguridad Firestore por colección (users, crops, alerts, weatherCache).
- Definí índices compuestos para crops (userId ASC, createdAt DESC) y alerts (userId ASC, severity DESC).
- Creé datos semilla (seedData.ts) con usuario demo, 3 cultivos demo y 3 alertas demo.
- La función `seedFirestore()` está preparada para que Jhunior la conecte tras el login.
- Documenté acuerdos del equipo en `00-acuerdos.md`.
- Documenté flujo Git en `01-git-flujo.md`.

## Archivos tocados
- firebase/firestore.rules (reescrito)
- firebase/firestore.indexes.json (actualizado)
- src/services/seedData.ts (reescrito)
- docs/obsidian/00-acuerdos.md (rellenado)
- docs/obsidian/01-git-flujo.md (rellenado)

## Problemas encontrados
- Ninguno.

## Solucion aplicada
- Reglas Firestore protegen datos por usuario autenticado.
- seedData.ts usa `writeBatch` para atomicidad.
- `seedFirestore()` verifica que el usuario esté autenticado antes de escribir.

## Pendiente
- Martel debe crear el proyecto en Firebase Console y activar Auth email/password.
- Martel debe compartir las credenciales en .env (sin subir al repo).
- Jhunior conectará seedFirestore() desde el frontend.
