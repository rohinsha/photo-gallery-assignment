import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from "@material-ui/core";
import { withRouter } from '../components/withRouter';
import './BreadCrumbs.css';

const Breadcrumbs = (props) => {
    const { location,navigate } = props.router;
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((el) => el);
    return (
        <MUIBreadcrumbs aria-label="breadcrumb" className="breadCrumbs"> 
            <Link style={{ cursor: "pointer" }} color="primary" onClick={() => navigate("/")} >
                users
            </Link>
            {pathnames.map((pathname, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames.length - 1;
                let isNum=/^\d+$/.test(pathname)
                // console.log("*******");
                // console.log(pathname);
                // console.log(routeTo);
                // console.log("*******");
                return isLast ? ( <Typography key={pathname}>{pathname}</Typography>) : isNum ? (<Link key={pathname} onClick={() =>navigate(routeTo)} style={{  cursor:'pointer' }} className="customLinks">
                    {pathname}
                </Link> ): (<div key={pathname} style={{cursor:'not-allowed'}}><Link  onClick={() =>navigate(routeTo)} style={{ 
                textDecoration:"none",color:"grey", pointerEvents: 'none'}}>
                    {pathname}
                </Link></div>)
            })}
        </MUIBreadcrumbs>
    );
};

export default withRouter(Breadcrumbs);
