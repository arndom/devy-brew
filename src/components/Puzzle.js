import React from 'react'
import Embed from 'react-embed';
import { Helmet } from 'react-helmet';
import ScriptTag from 'react-script-tag';
import postscribe from 'postscribe';

function Puzzle() {

    function useScript(src) {
        // Keep track of script status ("idle", "loading", "ready", "error")
        const [status, setStatus] = React.useState(src ? "loading" : "idle");
        React.useEffect(
          () => {
            // Allow falsy src value if waiting on other data needed for
            // constructing the script URL passed to this hook.
            if (!src) {
              setStatus("idle");
              return;
            }
            // Fetch existing script element by src
            // It may have been added by another intance of this hook
            let script = document.querySelector(`script[src="${src}"]`);
            if (!script) {
              // Create script
              script = document.createElement("script");
              script.src = src;
              script.async = true;
              script.setAttribute("data-status", "loading");
              // Add script to document body
              document.body.appendChild(script);
              // Store status in attribute on script
              // This can be read by other instances of this hook
              const setAttributeFromEvent = (event) => {
                script.setAttribute(
                  "data-status",
                  event.type === "load" ? "ready" : "error"
                );
              };
              script.addEventListener("load", setAttributeFromEvent);
              script.addEventListener("error", setAttributeFromEvent);
            } else {
              // Grab existing script status from attribute and set to state.
              setStatus(script.getAttribute("data-status"));
            }
            // Script event handler to update status in state
            // Note: Even if the script already exists we still need to add
            // event handlers to update the state for *this* hook instance.
            const setStateFromEvent = (event) => {
              setStatus(event.type === "load" ? "ready" : "error");
            };
            // Add event listeners
            script.addEventListener("load", setStateFromEvent);
            script.addEventListener("error", setStateFromEvent);
            // Remove event listeners on cleanup
            return () => {
              if (script) {
                script.removeEventListener("load", setStateFromEvent);
                script.removeEventListener("error", setStateFromEvent);
              }
            };
          },
          [src] // Only re-run effect if script src changes
        );
        return status;
      }

      const status = useScript(
        "https://CrosswordHobbyist.com/embedjs?puzzle_id=262"
      );

      React.useEffect(() => {
        const script = document.createElement('script');
      
        script.src = "https://CrosswordHobbyist.com/embedjs?puzzle_id=262";
        script.async = true;
      
        document.body.appendChild(script);
      
        return () => {
          document.body.removeChild(script);
        }
      }, []);
      
    return (
        <div id= "puzzle">

            <Helmet>
                <script type="text/javascript" src="https://MyWordSearch.com/embedjs.php?puzzle_id=525976"></script>
            </Helmet>    
            
            <ScriptTag isHydrating={false} type="text/javascript" src="https://CrosswordHobbyist.com/embedjs?puzzle_id=262" />
           
            script status : {status}        </div>
    )
}



export default Puzzle
