export const shouldUpdateComponent = (prevVNode, nextVNode): Boolean => {

  const { props: prevProps } = prevVNode;
  const { props: nextProps } = nextVNode;

  for (const key in nextProps) {
    if (prevProps[key] !== nextProps[key]) {
      return true;
    }
  }
  return false;
}