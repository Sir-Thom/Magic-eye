import { useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function routes() {
  const location = useLocation();

  return (
    <div>
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Switch location={location}>
            <Route path="/" exact component={Home} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}
