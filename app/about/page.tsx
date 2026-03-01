import RevealText from "@/components/ui/RevealText";
import RevealMedia from "@/components/ui/RevealMedia";

const experience = [
  {
    company: "Minergo Systems",
    title: "Lead Software Engineer",
    duration: "Jan 2025 - Dec 2025",
    description:
      "I Orchestrated cross functional team of  7 Engineer - Fullstack Engineer, QA Engineer, Mobile Engineer, DevOps - orchestrating development workflows and ensuring high-quality delivery. I worked closely with stakeholder to translate business requirement into scalable technical solutions. while maintaining clear communication and strategic alignment.",
  },

  {
    company: "Minergo Systems",
    title: "Fullstack Engineer",
    duration: "Sep 2024 - Jan 2025",
    description:
      "Played a key role in  building a real-time Fleet Management System across web and IoT platforms using JavaScript, MQTT, and WebSocket — now deployed to 900+ vehicles. I also created key technical documentation to maintain standards and align engineering with business needs.",
  },

  {
    company: "PT. Karya Bersama Anugerah",
    title: "IT Support",
    duration: "Mar 2021 - Dec 2023",
    description:
      "I built and maintained responsive, user-friendly WordPress websites, focusing not just on functionality but on user experience. At the same time, I supported computer systems and multimedia equipment, handling installations and troubleshooting to ensure smooth operations.",
  },

  {
    company: "Caseku.bpn",
    title: "Freelance Fullstack Engineer",
    duration: "Sep 2021 - Jan 2021",
    description:
      "This was my first time building a Laravel-based production tracking system. It challenged me to quickly learn the framework while delivering a reliable solution aligned with operational needs. Through this project, I strengthened my backend architecture and database design skills, and saw how technology can improve production visibility and efficiency.",
  },
];

const About = () => {
  return (
    <main className="flex flex-col gap-40 items-center justify-center">
      {/* About Section */}
      <div className="flex items-center flex-col justify-center gap-12 mt-4">
        <h1 className="text-5xl font-bold">
          <RevealText
            text={`Hollla 👋`}
            mode="sentence"
            delay={0.2}
            stagger={0.2}
            trigger="none"
          />
        </h1>

        <RevealMedia
          src="/assets/about_ahmad_nasser_ambari.png"
          type="image"
          alt="Hero"
          duration={0.7}
          delay={0.2}
          threshold={0.3}
          width={300}
          className="rounded-4xl object-cover h-[50vh] md:h-[60vh]"
          direction="up"
          trigger="none"
        />

        <p className="text-xl sm:text-3xl text-center w-full lg:w-2/3 mx-auto">
          <RevealText
            text={`I’m a software engineer with experience in the mining industry, passionate about building impactful digital experiences. Born and raised in Balikpapan, Borneo, I strive to create technology that makes real-world operations more efficient and innovative.`}
            mode="word"
            delay={0.2}
            duration={0.7}
            trigger="none"
          />
        </p>
        {/* Button Resume */}
        <button className="self-start text-sm md:text-md w-52 mx-auto">
          <div className="flex items-center justify-center border-b mx-auto text-xl">
            <RevealText
              text={`Download Resume`}
              direction="up"
              duration={0.7}
              delay={0.2}
              trigger="viewport"
            />

            <RevealMedia
              type="image"
              src="/assets/arrow.png"
              alt="Hero"
              direction="up"
              width={16}
              duration={0.7}
              delay={0.2}
              className="rounded-2xl"
            />
          </div>
        </button>
      </div>

      {/* Experience Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 mlg:gap-0 md:text-5xl">
        <h2 className="text-4xl md:text-5xl font-semibold mb-4 md:mb-0 md:sticky">
          <RevealText
            text={`WORK EXPERIENCE`}
            mode="word"
            delay={0.2}
            stagger={0.2}
            trigger="viewport"
          />
        </h2>

        <div className="flex flex-col gap-20">
          {experience.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 ">
              <div>
                <h3 className="text-xl md:text-3xl font-bold">
                  <RevealText
                    text={`${item.company} - ${item.title}`}
                    mode={"word"}
                    duration={0.3}
                    stagger={0.1}
                    delay={0.2}
                    trigger="viewport"
                  />
                </h3>

                <p className="text-lg sm:text-2xl md:text-md font-normal leading-normal">
                  <RevealText
                    text={`${item.duration}`}
                    mode={"word"}
                    duration={0.3}
                    stagger={0.1}
                    delay={0.2}
                    trigger="viewport"
                  />
                </p>
              </div>
              <p className="text-md sm:text-xl md:text-md font-normal leading-normal">
                <RevealText
                  text={`${item.description}`}
                  mode={`sentence`}
                  duration={0.3}
                  stagger={0.1}
                  delay={0.2}
                  trigger="viewport"
                />
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 mlg:gap-0 md:text-5xl">
        <h2 className="text-4xl md:text-5xl font-semibold mb-4 md:mb-0 md:sticky ">
          <RevealText
            text={`EDUCATION`}
            mode="word"
            delay={0.2}
            stagger={0.2}
            trigger="viewport"
          />
        </h2>

        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-2">
            <div>
              <h3 className="text-xl md:text-3xl font-bold top-24">
                <RevealText
                  text={`Mulawarman University - Engineering Informatics, BSc`}
                  mode={"word"}
                  duration={0.3}
                  stagger={0.1}
                  delay={0.2}
                  trigger="viewport"
                />
              </h3>

              <p className="text-lg sm:text-2xl md:text-md font-normal leading-normal">
                <RevealText
                  text={`Graduated  Jun 2024`}
                  mode={"word"}
                  duration={0.3}
                  stagger={0.1}
                  delay={0.2}
                  trigger="viewport"
                />
              </p>
            </div>
            <p className="text-md sm:text-xl md:text-md font-normal leading-normal">
              <RevealText
                text={`For my thesis, I built a budget forecasting model using LSTM neural networks to analyze time-series financial data. From preprocessing to evaluation, I developed the full machine learning pipeline and saw firsthand how data-driven insights can support smarter financial decisions.`}
                mode={`sentence`}
                duration={0.3}
                stagger={0.1}
                delay={0.2}
                trigger="viewport"
              />
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
