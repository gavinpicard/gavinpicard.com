const S=`
struct CellularAutomataParams {
  rows: u32,
  cols: u32,
  wrap: u32,
  neighborhood: u32,
  surviveMask: u32,
  birthMask: u32,
}

@group(0) @binding(0) var<storage, read> currentGrid: array<u32>;
@group(0) @binding(1) var<storage, read_write> nextGrid: array<u32>;
@group(0) @binding(2) var<uniform> params: CellularAutomataParams;

fn getCellIndex(row: u32, col: u32) -> u32 {
  return row * params.cols + col;
}

fn getNeighborCount(index: u32) -> u32 {
  let row = index / params.cols;
  let col = index % params.cols;
  var count: u32 = 0u;
  
  let isMoore = params.neighborhood == 0u;
  
  if (isMoore) {
    // Moore: 8 neighbors
    let offsets = array<vec2<i32>, 8>(
      vec2<i32>(-1, -1), vec2<i32>(-1, 0), vec2<i32>(-1, 1),
      vec2<i32>(0, -1), vec2<i32>(0, 1),
      vec2<i32>(1, -1), vec2<i32>(1, 0), vec2<i32>(1, 1)
    );
    
    for (var i = 0u; i < 8u; i++) {
      let offset = offsets[i];
      var nRow = i32(row) + offset.x;
      var nCol = i32(col) + offset.y;
      
      if (params.wrap == 1u) {
        // Handle wrapping for negative numbers
        nRow = ((nRow % i32(params.rows)) + i32(params.rows)) % i32(params.rows);
        nCol = ((nCol % i32(params.cols)) + i32(params.cols)) % i32(params.cols);
      } else {
        if (nRow < 0 || nRow >= i32(params.rows) || nCol < 0 || nCol >= i32(params.cols)) {
          continue;
        }
      }
      
      let neighborIndex = getCellIndex(u32(nRow), u32(nCol));
      count += currentGrid[neighborIndex];
    }
  } else {
    // Von Neumann: 4 neighbors
    let offsets = array<vec2<i32>, 4>(
      vec2<i32>(-1, 0), vec2<i32>(1, 0), vec2<i32>(0, -1), vec2<i32>(0, 1)
    );
    
    for (var i = 0u; i < 4u; i++) {
      let offset = offsets[i];
      var nRow = i32(row) + offset.x;
      var nCol = i32(col) + offset.y;
      
      if (params.wrap == 1u) {
        // Handle wrapping for negative numbers
        nRow = ((nRow % i32(params.rows)) + i32(params.rows)) % i32(params.rows);
        nCol = ((nCol % i32(params.cols)) + i32(params.cols)) % i32(params.cols);
      } else {
        if (nRow < 0 || nRow >= i32(params.rows) || nCol < 0 || nCol >= i32(params.cols)) {
          continue;
        }
      }
      
      let neighborIndex = getCellIndex(u32(nRow), u32(nCol));
      count += currentGrid[neighborIndex];
    }
  }
  
  return count;
}

@compute @workgroup_size(64)
fn computeNextGeneration(@builtin(global_invocation_id) globalId: vec3<u32>) {
  let index = globalId.x;
  let size = params.rows * params.cols;
  
  if (index >= size) {
    return;
  }
  
  let isAlive = currentGrid[index];
  let liveNeighbors = getNeighborCount(index);
  
  if (isAlive == 1u) {
    let surviveBit = 1u << liveNeighbors;
    nextGrid[index] = select(0u, 1u, (params.surviveMask & surviveBit) != 0u);
  } else {
    let birthBit = 1u << liveNeighbors;
    nextGrid[index] = select(0u, 1u, (params.birthMask & birthBit) != 0u);
  }
}
`;let e=null,U=null,G=!1,t=null,s=null,c=null,a=null,P=0,m=null,h=null,p=null,B=null;async function k(){if(G&&e)return{success:!0,device:e};try{if(!navigator.gpu)return{success:!1,error:"WebGPU not supported"};const r=await navigator.gpu.requestAdapter();if(!r)return{success:!1,error:"No WebGPU adapter available"};e=await r.requestDevice();const o=e.createShaderModule({code:S});return U=e.createComputePipeline({layout:"auto",compute:{module:o,entryPoint:"computeNextGeneration"}}),G=!0,{success:!0,device:e}}catch(r){return console.warn("WebGPU initialization failed:",r),{success:!1,error:r.message}}}function E(r){const o=r*4;if(P<o){t&&t.destroy(),s&&s.destroy(),a&&a.destroy(),c&&c.destroy(),t=e.createBuffer({size:o,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC}),s=e.createBuffer({size:o,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC}),a=e.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),c=e.createBuffer({size:24,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),P=o;const n=U.getBindGroupLayout(0);m=e.createBindGroup({layout:n,entries:[{binding:0,resource:{buffer:t}},{binding:1,resource:{buffer:s}},{binding:2,resource:{buffer:c}}]}),h=e.createBindGroup({layout:n,entries:[{binding:0,resource:{buffer:s}},{binding:1,resource:{buffer:t}},{binding:2,resource:{buffer:c}}]}),p=m,B=h}}function N(r){let o=0,n=0;for(const i of r.survive)i>=0&&i<=8&&(o|=1<<i);for(const i of r.birth)i>=0&&i<=8&&(n|=1<<i);return{surviveMask:o,birthMask:n}}async function D(r,o,n,i){if((!G||!e)&&!(await k()).success)throw new Error("WebGPU not available");const d=r.length,u=r[0].length,g=d*u;if(g<6400)throw new Error("Grid too small for WebGPU");E(g);const v=new Uint32Array(g);for(let l=0;l<d;l++)for(let f=0;f<u;f++)v[l*u+f]=r[l][f]?1:0;e.queue.writeBuffer(p===m?t:s,0,v);const{surviveMask:C,birthMask:y}=N(o),R=new Uint32Array([d,u,i?1:0,n==="moore"?0:1,C,y]);e.queue.writeBuffer(c,0,R);const x=Math.ceil(g/64),w=e.createCommandEncoder(),b=w.beginComputePass();b.setPipeline(U),b.setBindGroup(0,p),b.dispatchWorkgroups(x),b.end();const _=p===m?s:t;w.copyBufferToBuffer(_,0,a,0,v.byteLength),e.queue.submit([w.finish()]),[p,B]=[B,p],await a.mapAsync(GPUMapMode.READ);const M=new Uint32Array(a.getMappedRange()),I=Array(d).fill(null).map((l,f)=>Array(u).fill(null).map((W,A)=>M[f*u+A]===1));return a.unmap(),I}function O(){return typeof navigator<"u"&&navigator.gpu!==void 0}function T(r,o){return r*o>=6400}export{D as computeNextGenerationWebGPU,k as initWebGPU,O as isWebGPUAvailable,T as shouldUseWebGPU};
