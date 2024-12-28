# 3D Transformations App

This project is a simple 3D scene viewer implemented using **Three.js**. It includes interactive features for transforming 3D objects and visualizing them in a 3D space, along with orthographic projections (top, front, and side views). 

## Features

1. **3D Scene Setup**:
   - A 3D grid and axis helpers for better spatial visualization.
   - Ambient and directional lighting to enhance the view.

2. **3D Text Display**:
   - Displays a 3D wireframe text ('Y') in the scene.
   - Text can be transformed interactively using a GUI.

3. **Interactive Controls**:
   - **Orbit Controls**: Rotate, zoom, and pan the camera around the 3D scene.
   - **Transformations**: Use a GUI (dat.GUI) to modify:
     - Rotation
     - Scale
     - Position

4. **Orthographic Projections**:
   - Top view
   - Front view
   - Side view
   Each projection is rendered in its own canvas and shows a different perspective of the scene.

5. **Dynamic Transformation Matrix Display**:
   - Updates and displays the transformation matrix of the 3D object in real time.

## Getting Started

### Prerequisites
- A modern web browser (Google Chrome, Firefox, Edge, etc.).
- Internet connection to load external resources (e.g., fonts).

### Running the Project
1. Clone or download the project repository.
2. Open `index.html` in your browser.
3. Explore the 3D scene and interact with the GUI controls.

## Project Structure
```
|-- index.html # Main HTML file 
|-- script.js # Contains the Three.js scene setup and logic
|-- styles.css # Optional styles for the page
```

### Key Components in `script.js`:
- **Scene Setup**: Creates a scene, camera, and WebGL renderer.
- **Object Creation**: Loads fonts, creates 3D text geometry, and adds a wireframe.
- **GUI Setup**: Adds a dat.GUI interface for object transformations.
- **Projection Views**: Sets up orthographic cameras and renders top, front, and side views.

## Usage Instructions

- **Rotate, Zoom, Pan**: Use your mouse to interact with the scene.
- **Modify Object**: Use the GUI to rotate, scale, and position the text object.
- **View Projections**: Observe the orthographic projections displayed in their respective canvases.

## Dependencies

- [Three.js](https://threejs.org/): A JavaScript library for 3D rendering.
- [dat.GUI](https://github.com/dataarts/dat.gui): A lightweight GUI library for interactive controls.

## Example Scene

- 3D wireframe text ('Y') displayed at the center.
- Grid and axes for spatial reference.
- Projections show different perspectives of the scene.

## Acknowledgments

- Font from Three.js examples: [Helvetiker](https://github.com/mrdoob/three.js/tree/master/examples/fonts).
- JavaScript libraries used: [Three.js](https://threejs.org/), [dat.GUI](https://github.com/dataarts/dat.gui).

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it as you see fit.

---

Enjoy exploring the 3D scene!
