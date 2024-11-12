# Component Directory Structure

## Overview
Components are organized by domain and type, following a hierarchical structure that maps to our actor-based architecture.

```
app/
└── components/
    ├── ui/                    # Base UI components
    │   ├── button.tsx
    │   ├── input.tsx
    │   ├── card.tsx
    │   └── layout.tsx
    │
    ├── thread/               # Thread-related components
    │   ├── message.tsx
    │   ├── thread-list.tsx
    │   └── thread-view.tsx
    │
    ├── recipe/              # Recipe-related components
    │   ├── recipe-card.tsx
    │   ├── recipe-editor.tsx
    │   └── recipe-view.tsx
    │
    ├── user/               # User-related components
    │   ├── profile.tsx
    │   ├── settings.tsx
    │   └── preferences.tsx
    │
    ├── media/             # Media-related components
    │   ├── image-upload.tsx
    │   ├── gallery.tsx
    │   └── media-preview.tsx
    │
    └── shared/            # Shared components
        ├── loading.tsx
        ├── error.tsx
        └── navigation.tsx
```

## Component Categories

### UI Components
Base-level UI components that form the foundation of our design system.

- `button.tsx`
  - Core button component with variants
  - button.stories.tsx
  - button.test.tsx

- `input.tsx`
  - Text input components
  - input.stories.tsx
  - input.test.tsx

- `card.tsx`
  - Card container components
  - card.stories.tsx
  - card.test.tsx

### Thread Components
Components specific to thread functionality.

- `message.tsx`
  - Message display component
  - message.stories.tsx
  - message.test.tsx

- `thread-list.tsx`
  - Thread listing component
  - thread-list.stories.tsx
  - thread-list.test.tsx

- `thread-view.tsx`
  - Thread detail view
  - thread-view.stories.tsx
  - thread-view.test.tsx

### Recipe Components
Components for recipe management and display.

- `recipe-card.tsx`
  - Recipe preview card
  - recipe-card.stories.tsx
  - recipe-card.test.tsx

- `recipe-editor.tsx`
  - Recipe creation/editing form
  - recipe-editor.stories.tsx
  - recipe-editor.test.tsx

- `recipe-view.tsx`
  - Recipe detail view
  - recipe-view.stories.tsx
  - recipe-view.test.tsx

### User Components
User-related interface components.

- `profile.tsx`
  - User profile display
  - profile.stories.tsx
  - profile.test.tsx

- `settings.tsx`
  - User settings form
  - settings.stories.tsx
  - settings.test.tsx

### Media Components
Components for handling media content.

- `image-upload.tsx`
  - Image upload interface
  - image-upload.stories.tsx
  - image-upload.test.tsx

- `gallery.tsx`
  - Media gallery display
  - gallery.stories.tsx
  - gallery.test.tsx

### Shared Components
Reusable components used across different features.

- `loading.tsx`
  - Loading states and spinners
  - loading.stories.tsx
  - loading.test.tsx

- `error.tsx`
  - Error displays and boundaries
  - error.stories.tsx
  - error.test.tsx

## Component Structure
Each component should maintain:

```
component-name.tsx          # Main component file
component-name.stories.tsx  # Storybook stories
component-name.test.tsx     # Tests
```

## Storybook Organization
Stories are organized to mirror the component structure:

```
app/
└── components/
    ├── ui/
    │   ├── button.stories.tsx
    │   ├── input.stories.tsx
    │   └── card.stories.tsx
    ├── thread/
    │   ├── message.stories.tsx
    │   └── thread-list.stories.tsx
    └── ...
```

## Best Practices

1. **Component Isolation**
   - Each component should be self-contained
   - Minimize dependencies between components
   - Use composition over inheritance

2. **State Management**
   - Components should align with actor boundaries
   - Use React Query for server state
   - Implement proper loading and error states

3. **Testing**
   - Unit tests for business logic
   - Integration tests for component interaction
   - Visual regression tests via Storybook

4. **Documentation**
   - Clear component props documentation
   - Usage examples in stories
   - Accessibility considerations noted

5. **Performance**
   - Implement proper memoization
   - Lazy load when appropriate
   - Monitor bundle size impact

## Development Workflow

1. Create component file
2. Develop component in isolation
3. Write stories
4. Add tests
5. Document usage
6. Review & refine
7. Integration testing

## Future Considerations

- Component versioning strategy
- Microfrontend architecture support
- Design system evolution
- Performance monitoring
- Accessibility automation
```

This structure provides a scalable foundation that:
- Maps to your actor-based architecture
- Supports efficient Storybook development
- Maintains clear separation of concerns
- Enables easy testing and documentation
- Facilitates team collaboration