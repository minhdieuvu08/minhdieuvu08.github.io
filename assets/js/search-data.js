// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "projects",
          description: "Research in computer vision and reinforcement learning, plus the foundations I keep sharpening.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "A collection of academic projects and personal experiments in Reinforcement Learning, LLM-guided agents, and functional programming with Lisp.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "Education, experience and technical background — also available as a PDF.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-bookshelf",
          title: "bookshelf",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/books/";
          },
        },{id: "news-started-as-an-ai-engineer-intern-at-dizim-building-a-fashion-advice-chatbot-with-rag-on-aws-bedrock-and-amazon-opensearch",
          title: 'Started as an AI Engineer Intern at DIZIM, building a fashion-advice chatbot with...',
          description: "",
          section: "News",},{id: "news-attended-the-spring-school-on-statistics-and-machine-learning-at-the-vietnam-institute-for-advanced-study-in-mathematics-viasm",
          title: 'Attended the Spring School on Statistics and Machine Learning at the Vietnam Institute...',
          description: "",
          section: "News",},{id: "news-completed-the-io-research-spring-school-2025-14-modules-and-20-hours-on-research-methodology-academic-writing-and-research-ethics-in-computer-science",
          title: 'Completed the IO Research Spring School 2025 — 14 modules and 20+ hours...',
          description: "",
          section: "News",},{id: "news-invited-as-the-youngest-panelist-to-the-io-scholar-s-women-in-engineering-and-it-workshop-alongside-senior-policy-officers-and-phd-scholars-from-australia-and-vietnam",
          title: 'Invited as the youngest panelist to The IO Scholar’s Women in Engineering and...',
          description: "",
          section: "News",},{id: "news-submitted-my-bachelor-s-thesis-instance-segmentation-of-medical-equipment-in-hospital-environments-graded-9-5-10",
          title: 'Submitted my bachelor’s thesis, instance segmentation of medical equipment in hospital environments —...',
          description: "",
          section: "News",},{id: "news-published-my-write-up-from-our-january-2026-team-seminar-at-vnuhcm-us-skin-lesion-detection-on-total-body-photography-a-yolov8m-detector-reaching-0-666-map-50",
          title: 'Published my write-up from our January 2026 team seminar at VNUHCM–US: skin-lesion detection...',
          description: "",
          section: "News",},{id: "projects-algorithms-in-c",
          title: 'Algorithms in C++',
          description: "A topic-organised collection of algorithm implementations and LeetCode solutions in modern C++, each with its own write-up.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/algorithms-cpp/";
            },},{id: "projects-mental-attention-states-from-eeg",
          title: 'Mental Attention States from EEG',
          description: "Classifying focused, unfocused and drowsy states from raw EEG recordings — signal processing, feature engineering, and a comparison of classical and sequence models.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/eeg-attention-classification/";
            },},{id: "projects-skin-lesion-detection-on-total-body-photography",
          title: 'Skin Lesion Detection on Total-Body Photography',
          description: "Team seminar research at VNUHCM–US — benchmarking YOLO and Faster R-CNN families for skin-cancer screening on 3D total-body photography (iToBoS 2024).",
          section: "Projects",handler: () => {
              window.location.href = "/projects/itobos-lesion-detection/";
            },},{id: "projects-lisp-foundations",
          title: 'Lisp Foundations',
          description: "Working through Winston &amp; Horn&#39;s LISP (3rd ed.) in SBCL — chapter by chapter, with independent solutions to every exercise.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/lisp-foundations/";
            },},{id: "projects-llm-augmented-reinforcement-learning",
          title: 'LLM-Augmented Reinforcement Learning',
          description: "Using Gemini-generated Python heuristics to shape rewards and Q-values for Atari Space Invaders agents (PPO &amp; Q-Learning).",
          section: "Projects",handler: () => {
              window.location.href = "/projects/llm-augmented-rl/";
            },},{id: "projects-instance-segmentation-for-medical-equipment",
          title: 'Instance Segmentation for Medical Equipment',
          description: "Bachelor&#39;s thesis, graded 9.5/10 — benchmarking 20 instance-segmentation configurations on hospital scenes, then picking the one a robot can actually run.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/medical-equipment-instance-segmentation/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/CV_VuDieuMinh.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%76%75%64%69%65%75%6D%69%6E%68%31%39%37%33@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/minhdieuvu08", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/vudieuminh", "_blank");
        },
      },{
        id: 'social-kaggle',
        title: 'Kaggle',
        section: 'Socials',
        handler: () => {
          window.open("https://www.kaggle.com/minhdieuvu", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
