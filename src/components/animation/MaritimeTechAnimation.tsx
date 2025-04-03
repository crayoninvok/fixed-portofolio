// components/animation/MaritimeTechAnimation.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

export default function MaritimeTechAnimation() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Create scene
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 6;
    camera.position.y = 1;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Ocean plane for water effect
    const oceanGeometry = new THREE.PlaneGeometry(80, 80, 100, 100);
    const oceanMaterial = new THREE.MeshStandardMaterial({
      color: 0x0066cc,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });

    const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
    ocean.rotation.x = Math.PI / 2;
    ocean.position.y = -2;
    scene.add(ocean);

    // Ship model (simplified)
    const createShip = () => {
      const shipGroup = new THREE.Group();

      // Ship hull
      const hullGeometry = new THREE.BoxGeometry(2, 0.6, 4);
      const hullMaterial = new THREE.MeshStandardMaterial({
        color: 0x3a86ff,
        metalness: 0.5,
        roughness: 0.5,
      });
      const hull = new THREE.Mesh(hullGeometry, hullMaterial);
      hull.position.y = 0.4;
      shipGroup.add(hull);

      // Ship bridge/command tower
      const bridgeGeometry = new THREE.BoxGeometry(1, 1, 1.5);
      const bridge = new THREE.Mesh(bridgeGeometry, hullMaterial);
      bridge.position.y = 1.2;
      bridge.position.z = -1;
      shipGroup.add(bridge);

      // Radar/communication equipment (simplified)
      const radarGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.6, 8);
      const radarMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.8,
        roughness: 0.2,
      });
      const radar = new THREE.Mesh(radarGeometry, radarMaterial);
      radar.position.y = 2;
      radar.position.z = -1;
      shipGroup.add(radar);

      // Radar dish
      const radarDishGeometry = new THREE.CircleGeometry(0.3, 16);
      const radarDish = new THREE.Mesh(radarDishGeometry, radarMaterial);
      radarDish.position.y = 2.3;
      radarDish.position.z = -1;
      radarDish.rotation.x = Math.PI / 2;
      shipGroup.add(radarDish);

      // Ship positioning in scene
      shipGroup.position.y = -0.5;

      return shipGroup;
    };

    const ship = createShip();
    scene.add(ship);

    // Create data visualization elements (representing signals and communications)
    const createSignalBeams = () => {
      const beamsGroup = new THREE.Group();

      // Signal beams material
      const beamMaterial = new THREE.MeshBasicMaterial({
        color: 0x5effac,
        transparent: true,
        opacity: 0.6,
      });

      // Main communication beam
      const mainBeamGeometry = new THREE.CylinderGeometry(0.03, 0.03, 15, 8);
      const mainBeam = new THREE.Mesh(mainBeamGeometry, beamMaterial);
      mainBeam.position.y = 10;
      mainBeam.position.z = -1;
      mainBeam.rotation.x = Math.PI / 2;
      beamsGroup.add(mainBeam);

      // Create data packets that travel along the beam
      const packetGeometry = new THREE.SphereGeometry(0.08, 16, 16);
      const packetMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        transparent: true,
        opacity: 0.8,
      });

      const dataPackets = [];
      for (let i = 0; i < 5; i++) {
        const packet = new THREE.Mesh(packetGeometry, packetMaterial);
        packet.position.set(0, 2.3, -1 - i * 2);
        beamsGroup.add(packet);
        dataPackets.push(packet);
      }

      return { beamsGroup, dataPackets };
    };

    const { beamsGroup, dataPackets } = createSignalBeams();
    scene.add(beamsGroup);

    // Create floating circuit visualization (representing tech/code)
    const createCircuitBoard = () => {
      const circuitGroup = new THREE.Group();

      // Main circuit board
      const boardGeometry = new THREE.PlaneGeometry(4, 3, 1, 1);
      const boardMaterial = new THREE.MeshBasicMaterial({
        color: 0x0a0a0a,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
      });

      const board = new THREE.Mesh(boardGeometry, boardMaterial);
      board.position.set(-4, 1, 0);
      board.rotation.y = Math.PI / 3;
      circuitGroup.add(board);

      // Circuit lines
      const createCircuitLines = () => {
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x00ffff,
          transparent: true,
          opacity: 0.8,
        });

        // Create a grid pattern of lines
        for (let x = -1.8; x <= 1.8; x += 0.4) {
          const lineGeometry = new THREE.BufferGeometry();
          const vertices = new Float32Array([x, -1.4, 0.01, x, 1.4, 0.01]);
          lineGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(vertices, 3)
          );
          const line = new THREE.Line(lineGeometry, lineMaterial);
          board.add(line);
        }

        for (let y = -1.4; y <= 1.4; y += 0.4) {
          const lineGeometry = new THREE.BufferGeometry();
          const vertices = new Float32Array([-1.8, y, 0.01, 1.8, y, 0.01]);
          lineGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(vertices, 3)
          );
          const line = new THREE.Line(lineGeometry, lineMaterial);
          board.add(line);
        }

        // Create circuit nodes
        const nodeGeometry = new THREE.CircleGeometry(0.05, 16);
        const nodeMaterial = new THREE.MeshBasicMaterial({
          color: 0xff3366,
          side: THREE.DoubleSide,
        });

        const nodes = [];
        for (let x = -1.6; x <= 1.6; x += 0.8) {
          for (let y = -1.2; y <= 1.2; y += 0.8) {
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
            node.position.set(x, y, 0.02);
            board.add(node);
            nodes.push(node);
          }
        }

        return nodes;
      };

      const circuitNodes = createCircuitLines();

      return { circuitGroup, circuitNodes, board };
    };

    const { circuitGroup, circuitNodes, board } = createCircuitBoard();
    scene.add(circuitGroup);

    // Instrumentation elements (gauges, data panels)
    const createInstruments = () => {
      const instrumentsGroup = new THREE.Group();

      // Data panel
      const panelGeometry = new THREE.PlaneGeometry(2, 1.5, 1, 1);
      const panelMaterial = new THREE.MeshBasicMaterial({
        color: 0x002851,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
      });

      const panel = new THREE.Mesh(panelGeometry, panelMaterial);
      panel.position.set(4, 1, 0);
      panel.rotation.y = -Math.PI / 3;
      instrumentsGroup.add(panel);

      // Create gauge circles
      const gauges = [];
      const gaugeGeometry = new THREE.RingGeometry(0.2, 0.25, 32);
      const gaugeMaterial = new THREE.MeshBasicMaterial({
        color: 0x5271ff,
        side: THREE.DoubleSide,
      });

      // Add three gauges to the panel
      for (let i = 0; i < 3; i++) {
        const gauge = new THREE.Mesh(gaugeGeometry, gaugeMaterial);
        gauge.position.set(-0.6 + i * 0.6, 0.4, 0.01);
        panel.add(gauge);
        gauges.push(gauge);

        // Add gauge needles
        const needleGeometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([0, 0, 0.02, 0, 0.2, 0.02]);
        needleGeometry.setAttribute(
          "position",
          new THREE.BufferAttribute(vertices, 3)
        );
        const needleMaterial = new THREE.LineBasicMaterial({
          color: 0xff0000,
        });
        const needle = new THREE.Line(needleGeometry, needleMaterial);
        needle.position.copy(gauge.position);
        panel.add(needle);

        // Store the needle's initial rotation for animation
        needle.userData = { baseRotation: Math.PI / 2 };
        gauges.push(needle);
      }

      // Add data readout lines
      const lineGeometry = new THREE.PlaneGeometry(1.5, 0.05, 1, 1);
      const lineMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.8,
      });

      for (let i = 0; i < 4; i++) {
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        line.position.set(0, -0.2 - i * 0.2, 0.01);
        // Randomize line lengths for data visualization effect
        line.scale.x = 0.3 + Math.random() * 0.7;
        panel.add(line);
      }

      return { instrumentsGroup, gauges };
    };

    const { instrumentsGroup, gauges } = createInstruments();
    scene.add(instrumentsGroup);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Animate ocean waves
      const vertices = oceanGeometry.attributes.position.array;
      for (let i = 0; i < vertices.length; i += 3) {
        const x = oceanGeometry.attributes.position.getX(i / 3);
        const z = oceanGeometry.attributes.position.getZ(i / 3);

        // Create gentle wave motion
        const y =
          Math.sin(x / 2 + time) * 0.2 + Math.cos(z / 3 + time * 0.7) * 0.3;
        vertices[i + 1] = y;
      }
      oceanGeometry.attributes.position.needsUpdate = true;

      // Gentle ship rocking motion
      ship.rotation.x = Math.sin(time * 0.5) * 0.04;
      ship.rotation.z = Math.sin(time * 0.7) * 0.03;
      ship.position.y = -0.5 + Math.sin(time) * 0.1;

      // Animate data packets moving along the beam
      dataPackets.forEach((packet, index) => {
        // Move packets from ship up and then reset position
        packet.position.z = ((time * 0.5 + index) % 10) - 5;
      });

      // Slowly rotate the radar dish
      if (ship.children[3]) {
        ship.children[3].rotation.z += 0.01;
      }

      // Animate circuit board
      board.rotation.z = Math.sin(time * 0.2) * 0.05;

      // Pulse the circuit nodes
      circuitNodes.forEach((node, index) => {
        node.scale.set(
          0.8 + Math.sin(time * 0.8 + index) * 0.3,
          0.8 + Math.sin(time * 0.8 + index) * 0.3,
          1
        );
      });

      // Animate the instrument gauges
      gauges.forEach((gauge, index) => {
        if (gauge.userData && gauge.userData.baseRotation !== undefined) {
          // It's a needle
          gauge.rotation.z =
            gauge.userData.baseRotation + Math.sin(time + index) * 1.2;
        }
      });

      // Slowly rotate everything for a more dynamic view
      scene.rotation.y = Math.sin(time * 0.1) * 0.1;

      renderer.render(scene, camera);
    };

    // Start animation
    animate();
    setIsLoaded(true);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Add interactive camera movement on mouse
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = (event.clientY / window.innerHeight) * 2 - 1;

      camera.position.x = mouseX * 0.5;
      camera.position.y = 1 - mouseY * 0.3;
      camera.lookAt(0, 0, 0);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
        scene.clear();
      }
    };
  }, []);

  return (
    <>
      <div ref={mountRef} className="absolute inset-0 z-0 opacity-70" />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 dark:to-black/40 z-0" />

      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
    </>
  );
}

// Floating UI elements component to add interactive UI elements related to maritime tech
export function MaritimeTechUI() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Radar sweep effect */}
      <motion.div
        className="absolute top-10 right-10 w-64 h-64 rounded-full border-2 border-green-500/30 dark:border-green-500/50"
        style={{
          background:
            "conic-gradient(from 270deg, rgba(16, 185, 129, 0) 0%, rgba(16, 185, 129, 0.3) 10%, rgba(16, 185, 129, 0) 20%)",
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* VDR Data box */}
      <motion.div
        className="absolute left-10 top-40 w-72 p-4 bg-black/40 dark:bg-gray-900/60 border border-blue-500/50 rounded-lg backdrop-blur-sm"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="text-green-500 dark:text-green-400 text-xs font-mono">
          <div className="border-b border-green-500/30 pb-1 mb-2">
            VOYAGE DATA RECORDER
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1">
            <span>Heading:</span>
            <span>037.5°</span>
            <span>Speed:</span>
            <span>12.8 knots</span>
            <span>Position:</span>
            <span>10°27'S 147°21'E</span>
            <span>Wind:</span>
            <span>14 kts 025°</span>
            <span>Systems:</span>
            <span className="text-green-400">ONLINE</span>
          </div>
        </div>
      </motion.div>

      {/* Radio signal indicator */}
      <motion.div
        className="absolute right-10 bottom-40 flex flex-col items-end"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <div className="w-40 h-10 bg-black/40 dark:bg-gray-900/60 border border-purple-500/50 rounded-lg backdrop-blur-sm p-2 mb-2">
          <div className="flex justify-between items-center">
            <span className="text-purple-400 dark:text-purple-300 text-xs font-mono">
              GMDSS
            </span>
            <motion.div
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Signal bars */}
        <div className="flex items-end h-6 space-x-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="w-2 bg-blue-500/70 dark:bg-blue-400/80 rounded-sm"
              style={{ height: `${i * 5}px` }}
              animate={{
                height: [
                  `${i * 5}px`,
                  `${i * 5 + Math.random() * 10}px`,
                  `${i * 5}px`,
                ],
              }}
              transition={{
                duration: 0.5 + Math.random(),
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Code elements */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-80 h-20 bg-black/30 dark:bg-gray-900/50 border border-cyan-500/40 rounded-lg overflow-hidden backdrop-blur-sm"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 0.8 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <div className="p-2 text-cyan-500 dark:text-cyan-400 text-xs font-mono">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: -200 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <div>&#123; vessel: "NSI Explorer", &#125;</div>
            <div>status: "operational",</div>
            <div>route: [&#123;lat: 10.5, lng: 147.3&#125;,</div>
            <div>&#123;lat: 9.8, lng: 148.1&#125;],</div>
            <div>systems: [</div>
            <div>&nbsp;&nbsp;"navigation",</div>
            <div>&nbsp;&nbsp;"communications",</div>
            <div>&nbsp;&nbsp;"power_management"</div>
            <div>],</div>
            <div>next_port: "Singapore"</div>
            <div>&#125;</div>
            <div> Monitoring systems online</div>
            <div>const startMonitoring = () =&gt; &#123;</div>
            <div>&nbsp;&nbsp;setInterval(checkStatus, 5000);</div>
            <div>&#125;;</div>
            <div>startMonitoring();</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
