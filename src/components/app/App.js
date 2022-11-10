import { Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import MainPage from "../pages/MainPage";
import UserCreationPage from "../pages/UserCreationPage";
import UserViewPage from "../pages/UserViewPage";
import UserEditingPage from "../pages/UserEditingPage";
import Page404 from '../pages/Page404';
import Header from "../header/Header";

import './app.scss'

const App = () => {
	const location = useLocation();

	return (
		<>
			<Header/>
			<main>
				<SwitchTransition mode="out-in">
					<CSSTransition key={location.key} classNames="fade" timeout={400}>
						<Routes location={location}>	
							<Route path="/wizard-form" element={<MainPage/>}/>
							<Route path="/wizard-form/:userId" element={<UserViewPage/>}/>
							<Route path="/wizard-form/userCreation" element={<UserCreationPage/>}/>					
							<Route path="/wizard-form/userEditing" element={<UserEditingPage/>}/>
							<Route path="*" element={<Page404/>}/>				
						</Routes>
					</CSSTransition>
				</SwitchTransition>
			</main>	
		</>		
	);
}

export default App;
