// import React, { useState } from 'react';

// interface FileUploadProps {
//   name: string; // 고유한 이름 전달
// }

// function FileUpload({ name }: FileUploadProps) {
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const newFiles: File[] = Array.from(event.target.files);
//       setSelectedFiles([...selectedFiles, ...newFiles]);
//     }
//   };

//   const handleUpload = () => {  
//     // Do something with server
//   };

//   return (
//     <>
//       {selectedFiles.map((file, index) => (
//         <div key={index}>
//           <p>{name} - {file.name}</p>
//         </div>
//       ))}
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>파일 업로드</button>
//     </>
//   );
// }

// export default FileUpload;

import React, { useState } from 'react';

interface FileUploadProps {
  name: string; // 고유한 이름 전달
}

function FileUpload({ name }: FileUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showUploadButton, setShowUploadButton] = useState(true);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles: File[] = Array.from(event.target.files);
      setSelectedFiles([...selectedFiles, ...newFiles]);
      setShowUploadButton(false); // 파일 업로드 버튼 숨김
    }
  };

  const handleUpload = () => {
    // 파일 업로드 로직을 수행하고, 성공적으로 업로드되면 아래 코드를 통해 업로드 버튼을 다시 표시할 수 있습니다.
    // 파일 업로드 후 setShowUploadButton(true); 를 호출하여 업로드 버튼을 다시 표시하세요.
  };

  const handleCancel = (file: File) => {
    // 업로드된 파일 삭제(취소) 로직을 구현하세요.
    const updatedFiles = selectedFiles.filter((f) => f !== file);
    setSelectedFiles(updatedFiles);
    if (updatedFiles.length === 0) {
      setShowUploadButton(true); // 모든 파일이 삭제되면 업로드 버튼을 다시 표시
    }
  };

  return (
    <>
      {selectedFiles.map((file, index) => (
        <div key={index}>
          <p>
            {name} - {file.name}
            <button onClick={() => handleCancel(file)}>파일 삭제(취소)</button>
          </p>
        </div>
      ))}
      {showUploadButton && (
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>파일 업로드</button>
        </div>
      )}
    </>
  );
}

export default FileUpload;
