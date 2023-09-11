# docker 命令

## docker 常用命令

### 启动挂载容器

### 容器导出与导入

### 镜像导出与导入

以上两种只针对容器，不包括挂载的文件；镜像体积大，因为包括了历史记录等等

### 数据卷导出与导入

#### docker 数据卷的备份 (导出)

```dockerfile
//多个数据卷的备份
docker run --volumes-from 数据卷容器ID/数据卷容器名称 -v 宿主机备份目录:容器备份目录 镜像ID/镜像名称[:版本号] tar cvf 容器目录/数据卷压缩文件(格式为tar压缩文件) 容器数据卷文件1/目录1 容器数据卷文件2/目录2

docker run --volumes-from mycentos -v $(pwd):/backup centos tar cvf /backup/newcentos.tar /containerVolume1 /containerVolume2
```

#### docker 数据卷的迁移与恢复 (导入)

```dockerfile
//单个数据卷 与 多个数据卷的 数据卷恢复指令相同
docker run --volumes-from 需要恢复数据的数据卷容器ID/名称 -v 宿主机备份目录:容器备份目录 镜像ID/镜像名称[:版本号] tar xvf 容器备份目录/数据卷压缩文件(格式为tar压缩文件)

docker run --volumes-from mycentos -v $(pwd):/backup centos tar xvf /backup/newcentos.tar

//如果想要在执行完数据恢复指令后，删除临时容器，请在run 后面加上--rm属性，表示在执行完后立即删除该容器
docker run --rm --volumes-from mycentos -v $(pwd):/backup centos tar xvf /backup/newcentos.tar
```

UI

河网

数据库
