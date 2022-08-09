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
      return <h1 className="p-8 text-3xl text-red">Une erreur est survenue</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;