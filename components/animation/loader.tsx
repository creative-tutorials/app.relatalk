import loader from "@/styles/loader.module.css";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from "react";
export default function Loader(props: {
  isFetching: {
    text:
      | string
      | number
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | Iterable<ReactNode>
      | ReactPortal
      | PromiseLikeOfReactNode
      | null
      | undefined;
  };
}) {
  return (
    <div className={loader.wrapper}>
      <div className={loader.dots}></div>
      <div className={loader.text}>
        <p>{props.isFetching.text}</p>
      </div>
    </div>
  );
}
