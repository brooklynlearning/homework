const BaseIcon = {
  template: `
      <svg xmlns="http://www.w3.org/2000/svg" 
        class="svg-icon"
        :width="width" 
        :height="height" 
        viewBox="0 0 18 18" 
        :aria-labelledby="iconName" 
        role="presentation"
      >
        <title :id="iconName" lang="en">{{iconName}} icon</title>
        <g :fill="iconColor"><slot/></g>
      </svg>
  `,
  props: {
    iconName: {
      type: String,
      default: 'box',
    },
    width: {
      type: [Number, String],
      default: 18,
    },
    height: {
      type: [Number, String],
      default: 18,
    },
    iconColor: {
      type: String,
      default: 'currentColor',
    },
  },
}

const svgs = {
    circle: '<ellipse style="stroke: rgb(0, 0, 0); fill: rgb(36, 214, 16);" cx="235.891" cy="140.419" rx="21.033" ry="21.033"/>'
}
//const circlesvg = {template:svgs.circle}
