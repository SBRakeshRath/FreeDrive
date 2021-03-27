export default function positionContextMenu(props, container, UStyle) {
  if (container != null || container !== undefined) {
    if (container.current == null) return;
    //   console.log("inside");
    const ref = container.current;
    const divHeight = props.divHeight;
    const FirstCalc = ref.clientHeight + props.mouseY;
    let marginTop = props.mouseY;
    let marginLeft = props.mouseX;
    if (FirstCalc > divHeight) {
      marginTop = props.divHeight - ref.clientHeight - 10;
    }
    if (ref.clientWidth + props.mouseX > props.divWidth) {
      marginLeft = props.divWidth - ref.clientWidth - 10;
    }
    if (
      FirstCalc > divHeight ||
      ref.clientWidth + props.mouseX > props.divWidth
    ) {
      if (FirstCalc > divHeight) {
        UStyle((prev) => {
          return {
            ...prev,
            marginTop: marginTop,
            marginLeft: marginLeft,
          };
        });
      }
      if (ref.clientWidth + props.mouseX > props.divWidth) {
        UStyle((prev) => {
          return {
            ...prev,
            marginTop: marginTop,
            marginLeft: marginLeft,
          };
        });
      }
    } else {
      UStyle((prev) => {
        return {
          ...prev,
          marginLeft: props.mouseX,
          marginTop: props.mouseY,
        };
      });
    }
  } else {
    UStyle({
      marginLeft: props.mouseX,
      marginTop: props.mouseY,
    });
  }
}
