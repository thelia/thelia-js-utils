import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    //console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      console.log(this.state);
      return (
        <span className="block p-8 text-2xl text-center text-red">
          Une erreur est survenue
        </span>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
