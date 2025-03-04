export const techCardsItems = [
  {
    name: "Unity Engine",
    description: "C# and Shader Graph",
    imageUrl: "/imgs/logos/unity.svg",
    bgColor: "bg-[#FFFFFF]/15",
  },
  {
    name: "Unreal Engine",
    description: "C++ and Blueprint",
    imageUrl: "/imgs/logos/unreal.svg",
    bgColor: "bg-[#FFFFFF]/15",
  },
  {
    name: "Steamworks",
    description: "Lobbies and Achivements",
    imageUrl: "/imgs/logos/steam.svg",
    bgColor: "bg-[#00ADEE]/15",
  },
  {
    name: "Google Play",
    description: "Achivements and Version Control",
    imageUrl: "/imgs/logos/google.svg",
    bgColor: "bg-[#008744]/15",
  },
  {
    name: "Git",
    description: "Versionning",
    imageUrl: "/imgs/logos/git.svg",
    bgColor: "bg-[#F1502F]/15",
  },
  {
    name: "SFML",
    description: "C++",
    imageUrl: "/imgs/logos/sfml.svg",
    bgColor: "bg-[#90cd43]/15",
  },
  {
    name: "Raylib",
    description: "C and C++",
    imageUrl: "/imgs/logos/raylib.svg",
    bgColor: "bg-[#FFFFFF]/90",
  }
];

export const portfolioProjects = [
  {
    id: "twice",
    heading: "Twice Upon a Time",
    subheading: "",
    description:
      "Twice Upon a Time is a chill and cooperative two-player narrative platformer game bringing you back to a nostalgic world filled with all kinds of sweets and a gripping story. In a broken family, a brother and sister find shelter in a book for children to flee from the turmoil of their parents. Explore with them a story shaped by their imagination and fantasies. Will they be able to escape the harsh reality or will they be caught back in it ?",
    imageUrl: "/imgs/projects/portfolio-mockup1.gif",
    techStack: [
      "Unity",
      "C#",
      "Local Multiplayer",
      "Narrative",
      "Platformer",
    ],
    features: [
      {
        imageUrl: "/imgs/projects/LocalCoop.png",
        text: "Local Multiplayer",
      },
      {
        imageUrl: "/imgs/projects/Interaction.gif",
        text: "Physics based Interaction System",
      },
      {
        imageUrl: "/imgs/projects/Move.gif",
        text: "Platformer Movement State Machine",
      },],
    liveDemoUrl: "https://thomasboeglin.itch.io/twice-upon-a-time",
    videoUrl: "https://www.youtube.com/embed/lkO8rYcXZXY?autoplay=1&volume=20&vq=hd1080",
    videoGameplayUrl: "https://www.youtube.com/embed/lkO8rYcXZXY?autoplay=1&volume=20&vq=hd1080",
    contentPath: "/content/project1.md",
  },
  {
    id: "heal",
    heading: "Heal 'Em Up",
    subheading: "",
    description:
      "Stuck as the sole healer of the worst adventuring party in the realm it’s your job to do whatever it takes to keep your teammates alive. Support your group through dungeons as they fight through waves of enemies inevitably fail, and die, and blame YOU for their own mistakes!",
    imageUrl: "/imgs/projects/Heal.jpg",
    techStack: [
      "Unity",
      "Google Play",
      "C#",
      "Mobile",
      "Card Game",
      "Turnbased",
    ],
    features: [
      {
        imageUrl: "/imgs/projects/Mana.jpg",
        text: "Card and Mana System",
      },
      {
        imageUrl: "/imgs/projects/Levels.jpg",
        text: "Mobile Developement and UI",
      },
      {
        imageUrl: "/imgs/projects/Google.png",
        text: "Google PLay Services",
      },],
    liveDemoUrl: "https://play.google.com/store/apps/details?id=com.Team8.HealEMUp&hl=fr",
    videoUrl: "https://www.youtube.com/embed/lkO8rYcXZXY?autoplay=1&mute=1&vq=hd1080",
    videoGameplayUrl: "https://www.youtube.com/embed/lkO8rYcXZXY?autoplay=1&volume=100&vq=hd1080",
    contentPath: "/content/project1.md",
  },
  {
    id: "sfml",
    heading: "The Mothership Calls",
    subheading: "",
    description:
      "A multiplayer game with the SFML library, coded as a second year game programming group project.",
    imageUrl: "/imgs/projects/Mothership.png",
    techStack: [
      "SFML",
      "C++",
      "Local Multiplayer",
      "Shoot 'Em Up",
    ],
    features: [
      {
        imageUrl: "/imgs/projects/LineCol.png",
        text: "Line to Cirle Collision",
      },
      {
        imageUrl: "/imgs/projects/Game.png",
        text: "Local Multiplayer",
      },
      {
        imageUrl: "/imgs/projects/Renderer.png",
        text: "SFML Rendering",
      },],
    liveDemoUrl: "https://usofeurasia.itch.io/the-mothership-calls",
    videoUrl: "/video/Mothership.mp4",
    videoGameplayUrl: "/video/MothershipGamePlay.mp4",
    contentPath: "/content/project1.md",
  },
  {
    id: "jamo",
    heading: "Super JAM Bros",
    subheading: "",
    description:
      "A local multiplayer fighting game inspired by Super Smash Bros, developed as an assignment for an Unreal Engine C++ class, showcasing a character state machine and robust local multiplayer input handling.",
    imageUrl: "/imgs/projects/Jamo.png",
    techStack: [
      "Unreal Engine",
      "C++",
      "Local Multiplayer",
      "Fighting Game",
      "Super Smash Bros Like",
    ],
    features: [
      {
        imageUrl: "/imgs/projects/LocalMulti.gif",
        text: "Local Multiplayer",
      },
      {
        imageUrl: "/imgs/projects/StateMachine.PNG",
        text: "Movement StateMachine",
      },
      {
        imageUrl: "/imgs/projects/CPP.PNG",
        text: "UE5 C++",
      },],
    liveDemoUrl: "",
    videoUrl: "/video/Jamo.mp4",
    videoGameplayUrl: "/video/Jamo.mp4",
    contentPath: "/content/project1.md",
  },
  {
    id: "camera",
    heading: "Dynamic Camera System",
    subheading: "",
    description:
      "During a C# class, I developed a dynamic camera system in Unity, featuring versatile modes such as trolley cameras, third-person shooter (TPS) cameras, surveillance setups, and zone-specific transitions. The system seamlessly blends camera behaviors to enhance gameplay immersion. Its modular design allows for easy customization and integration into various game types.",
    imageUrl: "/imgs/projects/Bezier.PNG",
    techStack: [
      "Unity",
      "C#",
      "Camera",
      "TPS",
    ],
    features: [
      {
        imageUrl: "/imgs/projects/Dynamic.gif",
        text: "Dynamic Camera System",
      },
      {
        imageUrl: "/imgs/projects/Bezier.PNG",
        text: "Bezier Curve",
      },
      {
        imageUrl: "/imgs/projects/Trolly.PNG",
        text: "Trolly Camera",
      },],
    liveDemoUrl: "",
    videoUrl: "/video/Camera.mp4",
    videoGameplayUrl: "/video/Camera.mp4",
    contentPath: "/content/project1.md",
  },
  {
    id: "rast",
    heading: "C++ Rasterizer",
    subheading: "",
    description:
      "This is a rasterizer made in C++ and OpenGL. It converts vector-based coordinates into pixel-based images by calculating the color and intensity of each pixel based on geometric data and lighting.",
    imageUrl: "/imgs/projects/Raz.png",
    techStack: [
      "C++",
      "OpenGL",
      "Rendering",
    ],
    features: [
      {
        imageUrl: "/imgs/projects/Math.png",
        text: "Matrix Math",
      },
      {
        imageUrl: "/imgs/projects/Imgui.PNG",
        text: "Imgui",
      },
      {
        imageUrl: "/imgs/projects/Opengl.PNG",
        text: "OpenGL",
      },],
    liveDemoUrl: "",
    videoUrl: "/video/Rasterizer.mp4",
    videoGameplayUrl: "/video/Rasterizer.mp4",
    contentPath: "/content/project1.md",
  },
  {
    id: "cript",
    heading: "The Cryptic Mutation Conundrum",
    subheading: "",
    description:"In this escape game, you play as a child attempting to flee from a hospital. Unexpectedly, I took on the role of Lead Game Programmer for this project. I pushed the limits of what I had learned during my Unreal 5 course and am incredibly proud of both my contributions and the teamwork that made this project a success.",
    imageUrl: "/imgs/projects/Cript.png",
    techStack: [
      "Unreal Engine",
      "Blueprint",
      "Horror",
      "Escape Game",
    ],
    features: [
      {
        imageUrl: "/imgs/projects/PickUp.gif",
        text: "Interaction System",
      },
      {
        imageUrl: "/imgs/projects/Platforme.gif",
        text: "Platform Power",
      },
      {
        imageUrl: "/imgs/projects/Grid.gif",
        text: "Grid Game",
      },],
    liveDemoUrl: "https://zukkinioni.itch.io/tcmc",
    videoUrl: "/video/Unreal.mp4",
    videoGameplayUrl: "/video/UnrealGameplay.mp4",
    contentPath: "/content/project1.md",
  },
  {
    id: "coming",
    heading: "Quantictactoe",
    subheading: "",
    description:"Tic Tac Toe in the Quantum realm",
    imageUrl: "/imgs/projects/Coming.png",
    techStack: [
      "Unity",
      "Steamworks",
      "Online Multiplayer",
      "Reflexion Game",
    ],
    features: [
      {
        imageUrl: "",
        text: "",
      },
      {
        imageUrl: "",
        text: "",
      },
      {
        imageUrl: "",
        text: "",
      },],
    liveDemoUrl: "",
    videoUrl: "",
    videoGameplayUrl: "",
    contentPath: "/content/project1.md",
  }
];

export const testimonialItems = [

];