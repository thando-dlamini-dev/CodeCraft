import { motion } from "framer-motion";
const FlipLink = ({children, href, fontSize, staggerSettings, activeTheme, isActive }) => {
  const color = "text-orange-400"


    return (
    <motion.a 
    initial="initial"
    hover="hovered"
    transition={{ease: "easeInOut"}}
    href={href} 
    className={`relative block cursor-default font-bold overflow-hidden whitespace-nowrap ${fontSize} ${activeTheme.activeText}`}>
      <div>
        {children.split("").map((letter, index) => {
        return ( 
        <motion.span 
        transition={{
          duration: staggerSettings.duration,
          ease: "easeInOut",
          delay: staggerSettings.stagger * (isActive ? children.length - index : index)
        }}
        variants={{
          initial: {
            y: 0,
          },
          hovered: {
            y: "-100%"
          }
        }}
        className="inline-block"
        key={index}>
          {letter}
        </motion.span>
        )
      })}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((letter, index) => {
        return ( 
        <motion.span 
        transition={{
          duration: staggerSettings.duration,
          ease: "easeInOut",
          delay: staggerSettings.stagger * (isActive ? children.length - index : index)
        }}
        variants={{
          initial: {
            y: "100%",
          },
          hoverd: {
            y: 0
          }
        }}
        className={`inline-block ${activeTheme.text}`}
        key={index}>
          {letter}
        </motion.span>
        )
      })}
      </div>
      </motion.a>
    );
  }

export default FlipLink;