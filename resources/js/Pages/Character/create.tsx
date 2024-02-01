import Main from "../Main"
import ScrollContainer from "../../Components/ScrollContainer"

const CreateCharacter = () => {
    return (
        <Main>
            <ScrollContainer>
                <div className="row pt-2 pb-2">
                    <div className="col-12 mb-4">
                        <h1>Create Character</h1>
                    </div>
                    <div className="col-12">
                        <div className="form-group mb-4">
                            <label htmlFor="characterName"><span>Character Name</span></label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="personality"><span>Personality</span></label>
                            <textarea name="" id="" rows={10} className="form-control"></textarea>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="firstMessage"><span>First Message</span></label>
                            <textarea name="" id="" rows={10} className="form-control"></textarea>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="worldScenario"><span>Scenario</span></label>
                            <textarea name="" id="" rows={10} className="form-control"></textarea>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="worldScenario"><span>Example Message</span></label>
                            <textarea name="" id="" rows={10} className="form-control"></textarea>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="formFile" className="form-label">Default file input example</label>
                            <input className="form-control" type="file" id="formFile" />
                        </div>
                        <div className="d-grid mb-4">
                            <button className="btn btn-primary btn-block btn-lg"><span><i className="fa fa-save"></i></span> Save</button>
                        </div>
                    </div>
                </div>
            </ScrollContainer>
        </Main>
    )
}


export default CreateCharacter