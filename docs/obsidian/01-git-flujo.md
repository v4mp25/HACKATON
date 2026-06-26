# Flujo de Git

## Setup inicial (por Martel)
```bash
git clone https://github.com/v4mp25/HACKATON.git
cd HACKATON
npm install
```

## Inicio de jornada
```bash
git checkout develop
git pull origin develop
git checkout feature/mi-rama
git merge develop
```

## Antes de subir cambios
```bash
git checkout develop
git pull origin develop
git checkout feature/mi-rama
git merge develop
npm run build
```

## Subir cambios
```bash
git status
git add .
git commit -m "feat: descripción corta del avance"
git push -u origin feature/mi-rama
```

## Crear Pull Request (en GitHub)
1. Ir a Pull requests → New pull request.
2. Base: `develop` | Compare: `feature/mi-rama`.
3. Crear PR con descripción de cambios.
4. Esperar revisión de Martel.

## Orden de merge para integración final
| Orden | Merge | Responsable |
|-------|-------|-------------|
| 1 | `feature/martel-firebase-backend → develop` | Martel |
| 2 | `feature/jhunior-integration-services → develop` | Jhunior + Martel |
| 3 | `feature/pedro-forms-ux → develop` | Pedro + Jhunior |
| 4 | `feature/gilian-ui-layout → develop` | Gilian + Jhunior |
| 5 | `integration/final-mvp → develop` | Jhunior |
| 6 | `develop → main` | Martel |

## Resolución de conflictos
- Servicios/Firebase → decide Jhunior
- Firestore/seed/GitHub → decide Martel
- Layout/Dashboard → decide Gilian
- Formularios/UX → decide Pedro
- Si afecta demo → Jhunior decide con Martel
