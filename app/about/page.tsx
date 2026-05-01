import RevealText from "@/components/ui/RevealText";
import RevealMedia from "@/components/ui/RevealMedia";
import { experiences } from "@/data/projects";

export const metadata = {
  title: "About",
};

const About = () => {
  return (
    <main className="flex flex-col gap-40">
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
          src="/assets/about_ahmad_nasser_ambari.webp"
          type="image"
          alt="Hero"
          duration={0.3}
          delay={0.4}
          threshold={0.3}
          width={300}
          className="rounded-4xl object-cover md:h-[60vh]"
          direction="up"
          trigger="none"
          priority
          aspectRatio="[3/4]"
        />

        <p className="text-xl md:text-4xl lg:text-6xl text-justify w-full font-medium mx-auto">
          <RevealText
            text={`I’m a software engineer with experience in the mining industry, passionate about building impactful digital experiences. Born and raised in Balikpapan, Borneo, I strive to create technology that makes real-world operations more efficient and innovative.`}
            mode="word"
            threshold={0.025}
            stagger={0.1}
            duration={0.2}
            trigger="none"
          />
        </p>

        <button className="self-start text-sm md:text-md w-52 mx-auto">
          <div className="flex items-center justify-center mx-auto text-xl">
            <RevealText
              text={`Download Resume ➜]`}
              direction="up"
              duration={0.7}
              delay={0.2}
              trigger="viewport"
            />
          </div>
        </button>
      </div>

      {/* Experience Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-start mlg:gap-0 md:text-5xl">
        <h2 className="text-4xl md:text-5xl font-semibold mb-4 md:mb-0 lg:sticky lg:top-20 lg:bottom-20 lg:pb-4 self-start">
          <RevealText
            text={`Work Experience`}
            mode="word"
            delay={0.2}
            stagger={0.2}
            trigger="viewport"
          />
        </h2>

        <div className="flex flex-col gap-20">
          {experiences.map((item, index) => (
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
            text={`Education`}
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
