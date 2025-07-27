import React, { useState } from 'react';

const fileSystemData = [
    {
        name: 'src',
        type: 'folder',
        children: [
            {
                name: 'components',
                type: 'folder',
                children: [
                    { name: 'Accordion', type: 'folder', children: [{ name: 'ggg', type: 'file' }] },
                    { name: 'FolderItem.jsx', type: 'file' },
                    { name: 'FileItem.jsx', type: 'file' },
                ],
            },
            {
                name: 'pages',
                type: 'folder',
                children: [
                    { name: 'HomePage.jsx', type: 'file' },
                    { name: 'AboutPage.jsx', type: 'file' },
                ],
            },
            {
                name: 'assets',
                type: 'folder',
                children: [
                    { name: 'images', type: 'folder', children: [{ name: 'logo.png', type: 'file' }] },
                    { name: 'styles', type: 'folder', children: [{ name: 'main.css', type: 'file' }] },
                ],
            },
            { name: 'App.jsx', type: 'file' },
            { name: 'index.js', type: 'file' },
        ],
    },
    {
        name: 'public',
        type: 'folder',
        children: [
            { name: 'index.html', type: 'file' },
            { name: 'favicon.ico', type: 'file' },
            { name: 'flow', type: 'file' }
        ],
    },
    { name: 'package.json', type: 'file' },
    { name: 'README.md', type: 'file' },

];


const FileItem = ({ name }) => (
    <div >
        {name != 'flow' &&
            <div className="file-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon file-icon">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" />
                </svg>
                <span>{name}</span>

            </div>}
        <div>
            {name == 'flow' && <button style={{ whiteSpace: 'nowrap' }} className='sub-menu' onClick={() => {
                const saved = localStorage.getItem("flow-diagram");
                if (saved) {
                    const flow = JSON.parse(saved);
                    document.getElementById('demo-content').innerHTML = saved;
                }
            }}>Show JSON</button>}

        </div>

    </div>
);

const FolderItem = ({ name, children, depth = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const paddingLeft = (depth * 16) + 8;

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div>
            <div
                className="folder-header"
                style={{ paddingLeft: `${paddingLeft}px` }}
                onClick={toggleOpen}
            >

                {isOpen ? '-' : '+'}

                <span className="folder-name">{name}</span>
            </div>


            {isOpen && (
                <div className="folder-children-container">
                    {children.map((item, index) => (
                        <DirectoryItem key={index} item={item} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};


const DirectoryItem = ({ item, depth }) => {
    if (item.type === 'file') {
        return <FileItem name={item.name} />;
    } else if (item.type === 'folder') {
        return <FolderItem name={item.name} children={item.children} depth={depth} />;
    }
    return null;
};


const Accordian = () => {
    return (
        <div className="app-container">
            <div className="accordion-card">
                <h4 className="accordion-title">Tree view</h4>
                <div className="file-system-list">
                    {fileSystemData.map((item, index) => (
                        <DirectoryItem key={index} item={item} depth={0} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Accordian;