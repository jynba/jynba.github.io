关键：draggable=true

  :::tip 原文地址
  [如何使用draggable实现拖拽上传图片 | GitHub](https://github.com/jynba/jynba.github.io/issues/20)
  :::
  




```js
    <script>
      const draggable = document.getElementById("draggable");
      const droppable = document.getElementById("droppable");

      draggable.addEventListener("dragstart", handleDragStart);
      draggable.addEventListener("dragend", () => {
        draggable.classList.remove("moving");
      });
      droppable.addEventListener("dragover", handleDragover);
      droppable.addEventListener("dragleave", handleDragLeave);
      droppable.addEventListener("drop", handleDrop);

      function handleDragStart(e) {
        console.log(e.target.classList, "e.target.classList");
        // 通过settimeout避免拖动时拖动元素也变透明
        setTimeout(() => {
          draggable.classList.add("moving");
        }, 0);
        console.log(e.dataTransfer, "e.dataTransfer");
        e.dataTransfer.setData("text/plain", e.target.id);
        // 有 copy、move、和 auto 三种，分别是把鼠标指针
        // 显示为复制样式（带+号）、移动样式，或自动设置样式
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.effectAllowed = "move";
      }

      function handleDragover(e) {
        e.preventDefault();
        // 需要阻止元素禁止覆盖的默认行为
        droppable.classList.add("dragover");
        // e.dataTransfer.dropEffect = "move";
      }

      function handleDragLeave(e) {
        droppable.classList.remove("dragover");
      }

      function handleDrop(e) {
        e.preventDefault();

        // 如果是文件
        [...e.dataTransfer.items].forEach((item) => {
          if (item.kind === "file") {
            const file = item.getAsFile();
            createPreview(file);
          }
        });

        // 如果是元素
        const draggedId = e.dataTransfer.getData("text/plain");
        if (draggedId) {
          droppable.appendChild(document.getElementById(draggedId));
          droppable.classList.add("dropped");
        }
      }

      function createPreview(imageFile) {
        console.log(imageFile, "imageFile");
        if (!imageFile.type.startsWith("image/")) {
          return;
        }

        const image = document.createElement("img");
        image.src = URL.createObjectURL(imageFile);
        image.onload = function () {
          URL.revokeObjectURL(this.src);
        };
        droppable.appendChild(image);
        droppable.classList.add("dropped");
      }
    </script>
```