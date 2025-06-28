import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const models = [
  { name: "Millennium Falcon", path: "/models/millennium_falcon/scene.gltf" },
  { name: "Earth", path: "/models/earth/earth.gltf" },
  { name: "Ceiling Fan", path: "/models/ceiling_fan/ceiling_fan.gltf" },
  { name: "Gun", path: "/models/gun/gun.gltf" },
  { name: "Moon", path: "/models/moon/moon.gltf" },
  { name: "Pepsi Can", path: "/models/pepsi/pepsi.glb" },
  { name: "Pepsi Bottle", path: "/models/pepsi/pepsi_bottle.glb" },
];

const ThreeDViewer = ({ height = 700 }) => {
  const mountRef = useRef(null);
  const [selectedModel, setSelectedModel] = useState(0);
  const [spin, setSpin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let renderer, scene, camera, controls, currentMesh = null, frameId;
    const mount = mountRef.current;
    if (!mount) return;

    scene = new THREE.Scene();
    scene.background = null; // Transparent to show CSS gradient

    camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      1,
      1000
    );
    camera.position.set(4, 5, 11);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 5;
    controls.maxDistance = 20;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI;
    controls.autoRotate = false;
    controls.target = new THREE.Vector3(0, 1, 0);
    controls.update();

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(5, 10, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, 5, 5);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
    backLight.position.set(0, 5, -5);
    scene.add(backLight);

    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);

    const floorGeometry = new THREE.PlaneGeometry(500, 500);
    const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.15 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1;
    floor.receiveShadow = true;
    scene.add(floor);

    const loader = new GLTFLoader();

    const loadModel = (modelIdx) => {
      setLoading(true);
      const model = models[modelIdx];
      if (!model) return;

      loader.load(
        model.path,
        (gltf) => {
          if (currentMesh) {
            scene.remove(currentMesh);
          }
          const mesh = gltf.scene;
          mesh.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          const box = new THREE.Box3().setFromObject(mesh);
          const size = new THREE.Vector3();
          const center = new THREE.Vector3();
          box.getCenter(center);
          mesh.position.sub(center);
          box.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = (2 / maxDim) * 4;
          mesh.scale.setScalar(scale);

          scene.add(mesh);
          currentMesh = mesh;
          setLoading(false);
        },
        undefined,
        (error) => {
          console.error(error);
          setLoading(false);
        }
      );
    };

    loadModel(selectedModel);

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      controls.update();
      if (spin && currentMesh) {
        currentMesh.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      }
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [selectedModel, spin]);

  return (
    <div style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
        <label htmlFor="model-select" style={{ color: "#333", fontWeight: 600, marginRight: 8 }}>Model:</label>
        <select
          id="model-select"
          value={selectedModel}
          onChange={(e) => setSelectedModel(Number(e.target.value))}
          style={{ fontSize: "1em", padding: 4 }}
        >
          {models.map((model, idx) => (
            <option key={model.name} value={idx}>{model.name}</option>
          ))}
        </select>
        <label style={{ color: "#333", marginLeft: 16 }}>
          <input
            type="checkbox"
            checked={spin}
            onChange={(e) => setSpin(e.target.checked)}
            style={{ marginRight: 4 }}
          />
          Spin Model
        </label>
        {loading && (
          <span style={{ color: "#333", marginLeft: 16 }}>Loading...</span>
        )}
      </div>
      <div
        ref={mountRef}
        style={{
          width: "100%",
          height: height,
          background: "linear-gradient(180deg,rgb(175, 162, 162) 0%,rgb(149, 150, 160) 100%)",
          borderRadius: 8,
        }}
      />
    </div>
  );
};

export default ThreeDViewer;
