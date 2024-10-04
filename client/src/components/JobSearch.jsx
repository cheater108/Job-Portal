import { useState } from "react";
import searchIcon from "../assets/search.png";
import isLoggedIn from "../utils/isLoggedIn";
import { useNavigate } from "react-router-dom";

function JobSearch() {
    const [skills, setSkills] = useState([]);
    const [select, setSelect] = useState("Skills");
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    // const demoSkills = ["Javascript", "CSS", "HTML", "React", "next", "aws"];

    function handleSelect(e) {
        setSelect(e.target.value);
    }

    function handleSearch(e) {
        setSearch(e.target.value);
    }

    function handleEnter(e) {
        if (e.key === "Enter" || e.keyCode === 13) {
            if (select === "Skills" && search.length > 0) {
                setSkills((s) => {
                    if (!s.includes(search.toLowerCase())) {
                        return [...s, search.toLowerCase()];
                    }
                    return s;
                });
                setSearch("");
            }
        }
    }

    function handleApply() {
        if (select === "Skills" && search.length > 0) {
            setSkills((s) => {
                if (!s.includes(search.toLowerCase())) {
                    return [...s, search.toLowerCase()];
                }
                return s;
            });
            setSearch("");
        }
    }

    function handleClear() {
        setSearch("");
        setSkills([]);
    }

    function removeSkill(skill) {
        setSkills(skills.filter((s) => s !== skill));
    }
    return (
        <div className="w-full p-3 md:px-20 bg-white mt-5 shadow-3xl shadow-oshadow">
            <div>
                <div className="searchbar border-2 flex gap-3 p-2 px-4 rounded-md">
                    <label htmlFor="search">
                        <img src={searchIcon} height="27px" alt="search" />
                    </label>
                    <input
                        className="outline-none w-full"
                        type="text"
                        id="search"
                        placeholder="Type any job title"
                        value={search}
                        onChange={handleSearch}
                        onKeyDown={handleEnter}
                    />
                </div>
                <div className="flex lg:hidden flex-1 gap-2 flex-wrap mt-5">
                    {skills.map((skill) => {
                        return (
                            <div className="flex" key={skill}>
                                <p className="bg-lorange text-black font-medium flex items-center px-2">
                                    {skill}
                                </p>
                                <button
                                    className="bg-[#FF6B6B] text-white text-2xl aspect-square px-2"
                                    onClick={() => removeSkill(skill)}
                                >
                                    &#x2715;
                                </button>
                            </div>
                        );
                    })}
                </div>
                <div className="filters mt-5 flex items-center justify-between gap-2">
                    <select
                        className="border-2 rounded-md outline-none p-2 cursor-pointer self-start"
                        name="skills"
                        id="skills"
                        value={select}
                        onChange={handleSelect}
                    >
                        <option value="Skills">Skills</option>
                        <option value="Javascript">Javascript</option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="React">React</option>
                        <option value="Jobs">Jobs</option>
                    </select>
                    <div className="hidden lg:flex flex-1 gap-2 flex-wrap">
                        {skills.map((skill) => {
                            return (
                                <div className="flex" key={skill}>
                                    <p className="bg-lorange text-black font-medium flex items-center px-2">
                                        {skill}
                                    </p>
                                    <button
                                        className="bg-[#FF6B6B] text-white text-2xl aspect-square px-2"
                                        onClick={() => removeSkill(skill)}
                                    >
                                        &#x2715;
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    <div className="btns flex gap-2 self-start">
                        {isLoggedIn() ? (
                            <button
                                className="p-2 px-4 font-medium bg-orange text-white rounded-md"
                                onClick={() => navigate("/add")}
                            >
                                + Add Job
                            </button>
                        ) : (
                            <>
                                <button
                                    className="p-2 px-4 font-medium bg-orange text-white rounded-md"
                                    onClick={handleApply}
                                >
                                    Apply filter
                                </button>
                                <button
                                    className="p-2 px-4 font-medium text-orange rounded-md hover:bg-rose-200"
                                    onClick={handleClear}
                                >
                                    Clear
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobSearch;
